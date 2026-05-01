import logo from "../../../public/logo.png";

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/5 px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-1">
        <img src={logo} alt="CMS Lanka" className="w-8 h-8 rounded-md object-cover opacity-60" />
        <span className="text-white/30 text-xs">CMS Lanka © 2026</span>
      </div>
      <p className="text-white/20 text-xs">Customer Management System — Internal Tool</p>
    </footer>
  );
}