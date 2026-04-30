import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../public/logo.png";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaFileExcel,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const navItems = [
  { to: "/",  label: "Dashboard", icon: FaTachometerAlt, exact: true },
  { to: "/customers",label: "Customers", icon: FaUsers },
  { to: "/add", label: "Add Customer", icon: FaUserPlus },
  { to: "/upload", label: "Upload Excel", icon: FaFileExcel },
];

function SidebarContent({ onClose }) {
  const location = useLocation();

  const isActive = (item) =>
    item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CMS" className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <span className="text-white font-display font-bold text-base leading-tight block">
              CMS Lanka
            </span>
            <span className="text-white/60 text-xs tracking-wide">
              Customer Management
            </span>
          </div>
        </div>
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
              {/* Active left indicator */}
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

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background font-body overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-64 bg-primary flex-col flex-shrink-0 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Sidebar — Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-primary flex flex-col z-30 shadow-2xl
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-surface border-b border-gray-200 shadow-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
          >
            <FaBars size={17} />
          </button>
          <img src={logo} alt="CMS" className="w-7 h-7 rounded-lg" />
          <span className="font-display font-bold text-primary text-sm">
            Customer Management
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}