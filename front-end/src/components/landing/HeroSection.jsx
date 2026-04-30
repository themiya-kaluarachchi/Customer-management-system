import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers, FaFileExcel, FaShieldAlt } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#f0a500]/10 border border-[#f0a500]/25 text-[#f0a500] text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f0a500] animate-pulse" />
          Customer Management System
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-1px" }}
        >
          Manage Every
          <br />
          <span className="text-[#f0a500]">Customer</span>
          <br />
          With Precision.
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
          A powerful, fast CMS built for CMS Lanka — add, search, and manage customer records effortlessly.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 bg-[#f0a500] hover:bg-[#d4920a] text-[#0a0f1e] font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-[#f0a500]/20 hover:shadow-[#f0a500]/30 hover:-translate-y-0.5"
          >
            Go to Dashboard <FaArrowRight size={12} />
          </Link>
          <Link
            to="/customers"
            className="flex items-center gap-2.5 text-white/70 hover:text-white border border-white/15 hover:border-white/30 px-7 py-3.5 rounded-xl text-sm transition-all"
          >
            <FaUsers size={13} /> View Customers
          </Link>
        </div>

        {/* Mini stat strip */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-white/5 pt-10">
          {[
            { icon: FaUsers,      label: "Customer Records",  value: "Unlimited" },
            { icon: FaFileExcel,  label: "Bulk Import",       value: "1M+ rows"  },
            { icon: FaShieldAlt,  label: "Data Integrity",    value: "Validated" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon size={16} className="text-[#f0a500]/60 mx-auto mb-2" />
              <p className="text-white font-bold text-sm">{value}</p>
              <p className="text-white/30 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}