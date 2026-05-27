import express from "express";
import multer from "multer";
import fs from "fs";
import { DeepgramClient } from "@deepgram/sdk";
import dotenv from "dotenv";

import Transcript from "../models/Transcript.js";

dotenv.config();

const router = express.Router();

const deepgram = new DeepgramClient(process.env.DEEPGRAM_API_KEY);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    console.log(req.file);

    const audioBuffer = fs.readFileSync(req.file.path);

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
      response.results.channels[0].detected_language ||
      response.results.channels[0].alternatives[0].languages?.[0] ||
      "Unknown";
    console.log("Detected Language:", detectedLanguage);

    const newTranscript = new Transcript({
      fileName: req.file.originalname,
      transcript: transcriptText,
      audioPath: req.file.path,
      language: detectedLanguage,
    });

    await newTranscript.save();

    res.status(200).json({
      message: "Transcription successful",
      data: newTranscript,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Transcription failed",
      error: error.message,
    });
  }
});

router.get("/history", async (req, res) => {
  try {
    const transcripts = await Transcript.find().sort({ createdAt: -1 });

    res.status(200).json(transcripts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch transcripts",
    });
  }
});

export default router;
