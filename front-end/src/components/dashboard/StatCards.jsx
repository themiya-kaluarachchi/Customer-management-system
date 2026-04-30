import { FaArrowUp } from "react-icons/fa";

export default function StatCards({ stats, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${s.gradient} text-white p-5 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/75 text-xs font-medium uppercase tracking-wide">
                {s.label}
              </p>
              <h2 className="text-4xl font-display font-bold mt-1">
                {loading ? <span className="opacity-40 text-2xl">—</span> : s.value}
              </h2>
            </div>
            <div className="bg-white/15 p-3 rounded-xl">
              <s.icon size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-1.5">
            <FaArrowUp size={9} className="text-white/60" />
            <p className="text-white/60 text-xs">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}