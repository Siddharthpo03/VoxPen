import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import TranscriptBox from "./components/TranscriptBox";
import Footer from "./components/Footer";
import History from "./components/History";

function App() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/upload/history");

        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600 rounded-full blur-[140px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-fuchsia-500 rounded-full blur-[140px] opacity-20 animate-pulse" />
      <Navbar />

      <Hero />

      <UploadBox
        setTranscript={setTranscript}
        loading={loading}
        setLoading={setLoading}
      />

      <TranscriptBox
        transcript={transcript}
        loading={loading}
        history={history}
      />
      <History history={history} />
      <Footer />
    </div>
  );
}

export default App;
