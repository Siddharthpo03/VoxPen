import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUploadCloud, FiMic } from "react-icons/fi";

function UploadBox({
  setTranscript,
  loading,
  setLoading,
  session,
  setHistory,
}) {
  const mediaRecorderRef = useRef(null);

  const audioChunksRef = useRef([]);

  const [recording, setRecording] = useState(false);

  const [error, setError] = useState("");

  const [seconds, setSeconds] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);

  const [audioPreview, setAudioPreview] = useState(null);

  useEffect(() => {
    let interval;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (time) => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");

    const secs = String(time % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp4",
      "audio/x-m4a",
      "audio/webm",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only audio files are allowed.");

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB.");

      return;
    }

    setSelectedFile(file);

    setAudioPreview(URL.createObjectURL(file));
  };

  const handleTranscription = async () => {
    if (!selectedFile || loading) return;

    setError("");

    const formData = new FormData();

    formData.append("audio", selectedFile, selectedFile.name);

    formData.append("userId", session.user.id);

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
      );

      setTranscript(res.data.data.transcript);

      const historyRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/upload/history?userId=${session.user.id}`,
      );

      setHistory(historyRes.data);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Transcription failed.");
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    if (loading) return;

    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        const file = new File([audioBlob], "recording.wav", {
          type: "audio/wav",
        });

        setSelectedFile(file);

        setAudioPreview(URL.createObjectURL(audioBlob));

        stream.getTracks().forEach((track) => track.stop());
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
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();

    setRecording(false);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex justify-center mt-14 relative z-10 px-4"
    >
      <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-10 rounded-3xl w-full max-w-[700px] text-center shadow-2xl">
        <FiUploadCloud className="text-6xl mx-auto text-purple-500" />

        <h2 className="text-3xl font-semibold mt-5">Upload Audio File</h2>

        <p className="text-zinc-400 mt-3">
          Upload audio or record live speech.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-8">
          <label
            className={`px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105 inline-block ${
              loading
                ? "bg-purple-800 opacity-50 pointer-events-none"
                : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
            }`}
          >
            Upload Audio
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={loading}
            />
          </label>

          <button
            disabled={loading}
            onClick={recording ? stopRecording : startRecording}
            className={`px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border ${
              recording
                ? "bg-red-600 border-red-500 hover:bg-red-700"
                : "border-zinc-700 hover:border-purple-500"
            } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <FiMic />

            {recording ? "Stop Recording" : "Record"}
          </button>
        </div>

        {recording && (
          <p className="text-red-400 mt-5 animate-pulse">
            🔴 Recording... {formatTime(seconds)}
          </p>
        )}

        {audioPreview && (
          <div className="mt-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-300 mb-4">🎵 Preview Audio</p>

            <audio controls src={audioPreview} className="w-full" />

            <button
              onClick={handleTranscription}
              disabled={loading}
              className="mt-6 bg-fuchsia-600 hover:bg-fuchsia-700 px-8 py-3 rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Generating..." : "Generate Transcript"}
            </button>
          </div>
        )}

        {error && <p className="text-red-400 mt-5">{error}</p>}
      </div>
    </motion.div>
  );
}

export default UploadBox;
