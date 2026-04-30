import { Link, useLocation } from "react-router-dom";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import logo from "../../../public/logo.png";
import navItems from "./navItems";

export default function SidebarContent({ onClose }) {
  const location = useLocation();

  const isActive = (item) =>
    item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <Link to="/" onClick={onClose} className="flex items-center gap-3">
          <img
            src={logo}
            alt="CMS"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <span className="text-white font-display font-bold text-base leading-tight block">
              CMS Lanka
            </span>
            <span className="text-white/60 text-xs tracking-wide">
              Customer Management
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaTimes size={15} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto scrollbar-hide">
        <p className="text-white text-[14px] font-semibold uppercase tracking-widest px-3 mb-3">
          Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${
                  active
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-white/60 hover:bg-white/8 hover:text-white border border-transparent"
                }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
              )}

              <span
                className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors
                  ${active ? "bg-accent/20 text-accent" : "bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white"}`}
              >
                <Icon size={13} />
              </span>

              <span className="text-md font-medium">{item.label}</span>

              {active && (
                <FaChevronRight size={9} className="ml-auto text-accent/70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent text-xs font-bold">C</span>
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium">CMS Lanka</p>
            <p className="text-white/30 text-[12px]">© 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
