import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://vox-pen.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Handle preflight requests
app.use(
  cors({
    origin: "https://vox-pen.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/upload", uploadRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("VoxPen Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
