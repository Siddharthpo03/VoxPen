import { FiUploadCloud, FiMic } from "react-icons/fi";

function UploadBox() {
  return (
    <div className="mt-16 flex flex-col items-center">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-[700px] text-center">
        <FiUploadCloud className="text-6xl mx-auto text-purple-500 " />
        <h2 className="text-2xl font-semibold mt-5">Upload Audio File</h2>
        <p className="text-zinc-400 mt-3">
          Drap and drop audio files or record live speech.
        </p>
        <div className="flex justify-center gap-5 mt-8">
          <button className="bg-purple-600 hover:bg-purple-700 transition-all px-6 py-3 rounded-xl cursor-pointer">
            Upload File
          </button>

          <button className="border border-zinc-700 hover:border-purple-500 px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2">
            <FiMic />
            Record
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBox;
