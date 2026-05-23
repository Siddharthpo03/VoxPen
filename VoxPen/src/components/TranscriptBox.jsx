function TranscriptBox() {
  return (
    <div className="flex justify-center mt-10 px-6 relative z-10">
      <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 w-[900px] shadow-2xl">
        <h2 className="text-2xl font-semibold mb-5">Transcript</h2>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 min-h-[250px]">
          <p className="text-zinc-400 leading-relaxed">
            Your AI-generated transcription will appear here...
          </p>
        </div>
      </div>
    </div>
  );
}

export default TranscriptBox;
