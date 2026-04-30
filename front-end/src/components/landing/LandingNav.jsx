import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";

export default function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <img src={logo} alt="CMS Lanka" className="w-8 h-8 rounded-lg object-cover" />
        <span className="text-white font-bold text-sm tracking-wide">CMS Lanka</span>
      </div>
      <Link
        to="/dashboard"
        className="text-xs font-semibold text-[#f0a500] border border-[#f0a500]/40 px-4 py-2 rounded-lg hover:bg-[#f0a500]/10 transition-all tracking-widest uppercase"
      >
        Enter App
      </Link>
    </nav>
  );
}