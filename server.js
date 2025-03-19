import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import "dotenv/config"; // Çevre değişkenleri için

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Gemini API anahtarını .env dosyasından al
const API_KEY = process.env.GEMINI_API_KEY;

// Başlık üretme endpoint'i
app.post("/generate", async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: "Açıklama boş olamaz." });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: `Sosyal medya için havalı bir başlık öner: "${description}"`,
            }),
        });

        const data = await response.json();
        const caption = data?.candidates?.[0]?.output || "Başlık oluşturulamadı.";

        res.json({ caption });
    } catch (error) {
        console.error("Gemini API hatası:", error);
        res.status(500).json({ error: "AI başlık oluştururken hata oluştu." });
    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
});
