function History({ history }) {
  if (!history.length) return null;

  return (
    <div className="max-w-5xl w-full mx-auto px-6 mt-16">
      <h2 className="text-3xl font-bold mb-8">Previous Transcripts</h2>

      <div className="grid gap-6">
        {history.map((item) => (
          <div
            key={item._id}
            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-2xl shadow-lg hover:border-purple-500 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-purple-400">
              {item.fileName}
            </h3>

            <p className="text-sm text-zinc-500 mt-2">🌍 {item.language}</p>

            <p className="text-zinc-300 mt-4 leading-relaxed whitespace-pre-wrap">
              {item.transcript}
            </p>

            <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              <audio
                id={`audio-${item._id}`}
                src={`${import.meta.env.VITE_API_URL}/${item.audioPath
                  .replace(/\\/g, "/")
                  .replace(/^\/+/, "")}`}
              />

              <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
                <button
                  onClick={() => {
                    const audio = document.getElementById(`audio-${item._id}`);

                    if (audio.paused) {
                      audio.play();
                    } else {
                      audio.pause();
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  ▶ Play / Pause
                </button>

                <p className="text-zinc-400 text-sm">Audio Recording</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
