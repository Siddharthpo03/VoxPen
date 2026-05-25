import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      default: "",
    },

    audioPath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Transcript = mongoose.model("Transcript", transcriptSchema);

export default Transcript;
