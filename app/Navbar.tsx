export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 bg-black text-white border-b border-gray-800">
      <div className="text-xl font-bold">Alpha Narrative</div>
      <div className="flex gap-6 text-sm text-gray-300">
        <a href="#about" className="hover:text-white">About</a>
        <a href="#work" className="hover:text-white">Work</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </div>
    </nav>
  );
}