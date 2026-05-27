import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { FiUploadCloud, FiMic } from "react-icons/fi";

function UploadBox({ setTranscript, loading, setLoading }) {
  const mediaRecorderRef = useRef(null);

  const audioChunksRef = useRef([]);

  const [recording, setRecording] = useState(false);

  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp4",
      "audio/x-m4a",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only audio files are allowed.");

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB.");

      return;
    }

    const formData = new FormData();

    formData.append("audio", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
      );

      console.log(res.data);

      setTranscript(res.data.data.transcript);
    } catch (error) {
      console.log(error);

      setError("Transcription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        const formData = new FormData();

        formData.append("audio", audioBlob, "recording.wav");

        try {
          setLoading(true);

          const res = await axios.post(
            "http://localhost:5000/api/upload",
            formData,
          );

          console.log(res.data);

          setTranscript(res.data.data.transcript);
        } catch (error) {
          console.log(error);

          setError("Recording transcription failed.");
        } finally {
          setLoading(false);
        }
      };

      setSeconds(0);
      mediaRecorder.start();

      setRecording(true);
    } catch (error) {
      console.log(error);

      setError("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();

    setRecording(false);
  };
  const formatTime = (time) => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");

    const secs = String(time % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };
  return (
    <div className="flex justify-center mt-14 relative z-10">
      <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-10 rounded-3xl w-full max-w-[700px] text-center shadow-2xl">
        <FiUploadCloud className="text-6xl mx-auto text-purple-500" />

        <h2 className="text-3xl font-semibold mt-5">Upload Audio File</h2>

        <p className="text-zinc-400 mt-3">
          Drag and drop audio files or record live speech.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-8">
          <label
            className={`px-4 md:px-8 py-4 rounded-2xl text-lg font-medium transition-all inline-block ${
              loading
                ? "bg-purple-800 opacity-50 pointer-events-none"
                : "bg-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            }`}
          >
            {loading ? "Uploading..." : "Upload Audio"}

            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          <button
            disabled={loading}
            onClick={recording ? stopRecording : startRecording}
            className={`px-4 md:px-8 py-4 rounded-2xl text-lg transition-all flex items-center gap-2 border ${
              recording
                ? "bg-red-600 border-red-500 hover:bg-red-700"
                : "border-zinc-700 transition-all duration-300 hover:scale-105"
            } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <FiMic />

            {recording ? "Stop Recording" : "Record"}
          </button>
          {recording && (
            <p className="text-red-400 mt-5 animate-pulse">
              🔴 Recording... {formatTime(seconds)}
            </p>
          )}
        </div>

        {error && <p className="text-red-400 mt-5">{error}</p>}
      </div>
    </div>
  );
}

export default UploadBox;
