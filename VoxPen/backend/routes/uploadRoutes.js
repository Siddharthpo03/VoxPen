import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { DeepgramClient } from "@deepgram/sdk";
import dotenv from "dotenv";

import Transcript from "../models/Transcript.js";

dotenv.config();

const router = express.Router();

const deepgram = new DeepgramClient(process.env.DEEPGRAM_API_KEY);

// Ensure uploads folder exists
const uploadsDir = "uploads";

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");

    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
      "audio/x-m4a",
      "audio/webm",
      "audio/webm;codecs=opus",
      "audio/ogg",
      "audio/ogg;codecs=opus",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only valid audio files are allowed."));
    }

    cb(null, true);
  },
});

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    console.log("Uploaded File:", req.file);

    console.log("Request Body:", req.body);

    if (!req.file) {
      return res.status(400).json({
        message: "No audio file uploaded.",
      });
    }

    if (!req.body.userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    const filePath = path.resolve(req.file.path);

    const audioBuffer = fs.readFileSync(filePath);

    const response = await deepgram.listen.v1.media.transcribeFile(
      audioBuffer,
      {
        model: "nova-2-general",
        smart_format: true,
        punctuate: true,
        paragraphs: true,
        utterances: true,
        diarize: false,
        filler_words: false,
        detect_language: true,
      },
    );

    const transcriptText =
      response.results.channels[0]?.alternatives[0]?.transcript?.trim() ||
      "Could not generate transcript for this audio.";

    const detectedLanguage =
      response.results.channels[0]?.detected_language ||
      response.results.channels[0]?.alternatives[0]?.languages?.[0] ||
      "Unknown";

    console.log("Detected Language:", detectedLanguage);

    const newTranscript = new Transcript({
      fileName: req.file.originalname,

      transcript: transcriptText,

      userId: req.body.userId,

      audioPath: req.file.path.replace(/\\/g, "/"),

      language: detectedLanguage,
    });

    await newTranscript.save();

    res.status(200).json({
      message: "Transcription successful",

      data: newTranscript,
    });
  } catch (error) {
    console.log("Upload Error:", error);

    res.status(500).json({
      message: "Transcription failed",

      error: error.message,
    });
  }
});

router.get("/history", async (req, res) => {
  try {
    if (!req.query.userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    const transcripts = await Transcript.find({
      userId: req.query.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(transcripts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch transcripts",
    });
  }
});

export default router;
