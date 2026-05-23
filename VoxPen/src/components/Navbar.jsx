function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
      <h1 className="text-2xl font-bold tracking-wide text-white">VoxPen</h1>
      <button className="bg-purple-600 hover:bg-purple-700 transition-all px-5 py-2 rounded-xl cursor-pointer">
        Try Now
      </button>
    </nav>
  );
}

export default Navbar;
