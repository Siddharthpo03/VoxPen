function TranscriptBox({ transcript, loading, history }) {
  const downloadTranscript = () => {
    if (!transcript) return;

    const blob = new Blob([transcript], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "voxpen-transcript.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const downloadAllTranscripts = () => {
    if (!history.length) return;

    const content = history
      .map((item) => {
        return `
File: ${item.fileName}

Language: ${item.language}

Transcript:
${item.transcript}

----------------------------------------
`;
      })
      .join("\n");

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "voxpen-all-transcripts.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center mt-10 px-6">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-[700px] shadow-2xl">
        <h2 className="text-2xl font-semibold mb-5">Transcript</h2>

        {loading ? (
          <p className="text-purple-400">Generating transcript...</p>
        ) : transcript ? (
          <>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {transcript}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={downloadTranscript}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Download Transcript
              </button>

              <button
                onClick={downloadAllTranscripts}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Download All Transcripts
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={downloadAllTranscripts}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Download All Transcripts
          </button>
        )}
      </div>
    </div>
  );
}

export default TranscriptBox;
