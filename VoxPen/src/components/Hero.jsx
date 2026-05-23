import { motion } from "framer-motion";
function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-28 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold leading-tight max-w-5xl"
      >
        AI Powered Speech to Text
      </motion.h1>
      <p className="text-zinx-400 mt-6 text-lg max-w-2xl">
        Upload audio or record your voice and generate Powerful AI
        transcriptions instantly.
      </p>
    </section>
  );
}

export default Hero;
