import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("audio"), (req, res) => {
  console.log(req.file);

  res.json({
    message: "Audio Uploaded Successfully",
    file: req.file,
  });
});

export default router;
