import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate-title", upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Görsel yüklenmedi!" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([{
        inlineData: { data: req.file.buffer.toString("base64"), mimeType: req.file.mimetype }
    }]);
    
    res.json({ title: result.response.text() });
});

app.listen(port, () => console.log(`Server ${port} üzerinde çalışıyor`));
