import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white">VoxPen</h2>

          <p className="text-zinc-400 mt-2 text-sm">
            AI-powered speech to text platform built with MERN.
          </p>
        </div>

        <div className="flex items-center gap-5 text-zinc-400 text-xl">
          <a href="#" className="hover:text-purple-400 transition-all">
            <FiGithub />
          </a>

          <a href="#" className="hover:text-purple-400 transition-all">
            <FiTwitter />
          </a>

          <a href="#" className="hover:text-purple-400 transition-all">
            <FiLinkedin />
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-zinc-500 text-sm">
        © 2026 VoxPen. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
