import app from "./app.js";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/connectDB.js";
import path from "path";


const __filename = import.meta.url;
const __dirname = path.dirname(__filename);

dotenv.config({ path: "config/config.env" });

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working fine",
  });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
