import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// routes example
app.get("/", (req, res) => {
  res.json({ message: "API working ✅" });
});

// Mongo connection (cached)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// Vercel handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}