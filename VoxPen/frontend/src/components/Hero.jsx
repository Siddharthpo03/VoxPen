import { motion } from "framer-motion";
function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-32 px-6 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl md:text-7xl font-bold leading-tight max-w-5xl"
      >
        Transform Voice Into
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
          {" "}
          AI-Powered Text
        </span>
      </motion.h2>
      <p className="text-zinc-400 mt-6 text-lg max-w-2xl">
        Upload audio, record speech, and generate accurate AI-powered
        transcriptions instantly.
      </p>
    </section>
  );
}

export default Hero;
