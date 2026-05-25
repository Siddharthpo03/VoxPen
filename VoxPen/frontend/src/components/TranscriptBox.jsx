function TranscriptBox({ transcript, loading }) {
  if (!loading && !transcript) return null;

  return (
    <div className="flex justify-center mt-10 px-6">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-[700px] shadow-2xl">
        <h2 className="text-2xl font-semibold mb-5">Transcript</h2>

        {loading ? (
          <p className="text-purple-400">Generating transcript...</p>
        ) : (
          <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {transcript}
          </p>
        )}
      </div>
    </div>
  );
}

export default TranscriptBox;
