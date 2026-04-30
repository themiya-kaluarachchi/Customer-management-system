import {
  FaUserPlus,
  FaFileExcel,
  FaSearch,
  FaEdit,
  FaTachometerAlt,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: FaTachometerAlt,
    title: "Live Dashboard",
    desc: "Instant overview of total customers, contact coverage, and address completeness at a glance.",
  },
  {
    icon: FaUserPlus,
    title: "Add & Edit Customers",
    desc: "Full customer profiles with name, NIC, date of birth, phone, and address — validated on save.",
  },
  {
    icon: FaFileExcel,
    title: "Bulk Excel Import",
    desc: "Upload up to 1,000,000 records in one go. Row-by-row error reporting so nothing slips through.",
  },
  {
    icon: FaSearch,
    title: "Instant Search",
    desc: "Find any customer by ID in milliseconds. Clear and re-search without losing your place.",
  },
  {
    icon: FaEdit,
    title: "Inline Editing",
    desc: "Edit any record directly from the customer profile. Changes reflected immediately across the system.",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Ready",
    desc: "Fully responsive layout with a slide-out drawer nav. Works on any screen, any device.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-[#f0a500] text-xs font-bold uppercase tracking-[0.2em] mb-3">Features</p>
        <h2
          className="text-3xl md:text-5xl font-black text-white"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Everything you need.
          <br />
          <span className="text-white/30">Nothing you don't.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-[#f0a500]/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#f0a500]/10 flex items-center justify-center mb-4 group-hover:bg-[#f0a500]/20 transition-colors">
              <Icon size={16} className="text-[#f0a500]" />
            </div>
            <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}