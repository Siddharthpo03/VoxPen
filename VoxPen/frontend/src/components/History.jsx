function History({ history }) {
  if (!history.length) return null;

  return (
    <div className="max-w-5xl w-full mx-auto px-6 mt-16">
      <h2 className="text-3xl font-bold mb-8">Previous Transcripts</h2>

      <div className="grid gap-6">
        {history.map((item) => (
          <div
            key={item._id}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-purple-400">
              {item.fileName}
            </h3>

            <p className="text-sm text-zinc-500 mt-2">🌍 {item.language}</p>

            <p className="text-zinc-300 mt-4 leading-relaxed">
              {item.transcript}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
