import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import TranscriptBox from "./components/TranscriptBox";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <UploadBox />
      <TranscriptBox />
    </div>
  );
}

export default App;
