import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import TranscriptBox from "./components/TranscriptBox";
import Footer from "./components/Footer";

function App() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <Hero />

      <UploadBox
        setTranscript={setTranscript}
        loading={loading}
        setLoading={setLoading}
      />

      <TranscriptBox transcript={transcript} loading={loading} />
      <Footer />
    </div>
  );
}

export default App;
