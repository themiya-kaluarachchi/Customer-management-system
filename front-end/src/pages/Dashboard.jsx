import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaPhone,
  FaMapMarkerAlt,
  FaUserPlus,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const total = customers.length;
  const withPhone = customers.filter((c) => c.phones?.length).length;
  const withAddress= customers.filter((c) => c.addresses?.length).length;
  const recent = [...customers].sort((a, b) => b.id - a.id).slice(0, 5);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const pct = (n) => (total > 0 ? Math.round((n / total) * 100) : 0);

  const stats = [
    {
      label: "Total Customers",
      value: total,
      icon: FaUsers,
      gradient: "from-primary to-secondary",
      sub: "All registered records",
    },
    {
      label: "With Phone",
      value: withPhone,
      icon: FaPhone,
      gradient: "from-emerald-500 to-emerald-700",
      sub: `${pct(withPhone)}% of total`,
    },
    {
      label: "With Address",
      value: withAddress,
      icon: FaMapMarkerAlt,
      gradient: "from-accent to-orange-600",
      sub: `${pct(withAddress)}% of total`,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-textMain">
            Dashboard
          </h1>
          <p className="text-textMuted text-sm mt-0.5">{today}</p>
        </div>
        <Link
          to="/add"
          className="flex items-center gap-2 bg-accent hover:bg-accentDark text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all w-fit"
        >
          <FaUserPlus size={13} />
          Add Customer
        </Link>
      </div>

      {/* ── Stat Cards ── */}
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
                  {loading ? (
                    <span className="opacity-40 text-2xl">—</span>
                  ) : (
                    s.value
                  )}
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

      {/* ── Recent Customers ── */}
      <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-display font-semibold text-textMain">
              Recent Customers
            </h2>
            <p className="text-textMuted text-xs mt-0.5">Last 5 added</p>
          </div>
          <Link
            to="/customers"
            className="flex items-center gap-1.5 text-accent hover:text-accentDark text-sm font-medium transition-colors"
          >
            View all <FaArrowRight size={10} />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-9 h-9 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-textMuted text-sm">Loading customers…</p>
          </div>
        ) : recent.length === 0 ? (
          <div className="p-12 text-center text-textMuted">
            <FaUsers size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No customers yet</p>
            <Link
              to="/add"
              className="mt-3 inline-flex items-center gap-1.5 text-accent text-sm hover:underline"
            >
              <FaUserPlus size={11} /> Add your first customer
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  {["Customer", "NIC", "Phone", "City"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[11px] font-semibold text-textMuted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recent.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-textMain text-sm">
                          {c.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-textMuted text-sm font-mono">
                      {c.nic}
                    </td>
                    <td className="px-5 py-3.5 text-textMuted text-sm">
                      {c.phones?.[0]?.number || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-textMuted text-sm">
                      {c.addresses?.[0]?.city || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}