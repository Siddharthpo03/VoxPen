import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav className="relative flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex items-center">
        <img
          src="/favicon.png"
          alt="VoxPen Logo"
          className="w-15 absolute left-4 top-1 object-contain pointer-events-none select-none"
        />

        <h1 className="text-2xl font-bold ml-16 bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
          VoxPen
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex items-center gap-8 text-zinc-300"
      ></motion.div>
    </nav>
  );
}

export default Navbar;
