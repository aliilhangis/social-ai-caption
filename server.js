import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import "dotenv/config"; // Çevre değişkenleri için

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/generate", async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ error: "Görsel yüklenmedi." });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateText?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: "Bu fotoğraf için sosyal medyada etkileyici bir başlık öner.",
                image: { content: image.split(",")[1] }, // Base64 formatından temizleyerek gönderiyoruz
            }),
        });

        const data = await response.json();
        const caption = data?.candidates?.[0]?.output || "Başlık bulunamadı.";

        res.json({ caption });
    } catch (error) {
        console.error("Gemini API hatası:", error);
        res.status(500).json({ error: "Başlık oluşturulurken hata oluştu." });
    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
});
