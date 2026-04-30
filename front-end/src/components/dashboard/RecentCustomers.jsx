import { FaUsers, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RecentCustomers({ recent, loading }) {
  return (
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-display font-semibold text-textMain">Recent Customers</h2>
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
                      <span className="font-medium text-textMain text-sm">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-textMuted text-sm font-mono">{c.nic}</td>
                  <td className="px-5 py-3.5 text-textMuted text-sm">{c.phones?.[0]?.number || "—"}</td>
                  <td className="px-5 py-3.5 text-textMuted text-sm">{c.addresses?.[0]?.city || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}