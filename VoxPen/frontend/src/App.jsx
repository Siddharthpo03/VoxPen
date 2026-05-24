import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import TranscriptBox from "./components/TranscriptBox";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600 rounded-full opacity-20 blur-[120px]"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600 rounded-full opacity-20 blur-[120px]"></div>
      <Navbar />
      <Hero />
      <UploadBox />
      <TranscriptBox />
    </div>
  );
}

export default App;
