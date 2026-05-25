import axios from "axios";
import { FiUploadCloud, FiMic } from "react-icons/fi";

function UploadBox({ setTranscript, loading, setLoading }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-14 relative z-10">
      <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-10 rounded-3xl w-[700px] text-center shadow-2xl">
        <FiUploadCloud className="text-6xl mx-auto text-purple-500" />

        <h2 className="text-3xl font-semibold mt-5">Upload Audio File</h2>

        <p className="text-zinc-400 mt-3">
          Drag and drop audio files or record live speech.
        </p>

        <div className="flex justify-center gap-5 mt-8">
          <label className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl text-lg font-medium transition-all cursor-pointer inline-block">
            Upload Audio
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          <button className="border border-zinc-700 hover:border-purple-500 px-8 py-4 rounded-2xl text-lg transition-all flex items-center gap-2 cursor-pointer">
            <FiMic />
            Record
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBox;
