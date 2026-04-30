import { FaBars } from "react-icons/fa";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";

export default function MobileTopBar({ onMenuOpen }) {
  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-surface border-b border-gray-200 shadow-sm flex-shrink-0">
      <button
        onClick={onMenuOpen}
        className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
      >
        <FaBars size={17} />
      </button>
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="CMS" className="w-7 h-7 rounded-lg" />
        <span className="font-display font-bold text-primary text-sm">
          Customer Management
        </span>
      </Link>
    </header>
  );
}
