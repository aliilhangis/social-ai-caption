import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json()); // JSON isteklere izin ver
