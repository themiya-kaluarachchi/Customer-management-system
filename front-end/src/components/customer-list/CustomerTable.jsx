import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomerTable({ customers, loading, onDeleteClick, offset = 0 }) {
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="p-14 text-center">
        <div className="w-9 h-9 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-textMuted text-sm">Loading customers…</p>
      </div>
    );

  if (customers.length === 0)
    return (
      <div className="p-14 text-center text-textMuted">
        <FaSearch size={28} className="mx-auto mb-3 opacity-20" />
        <p className="font-medium">No customers found</p>
        <p className="text-xs mt-1">Try a different search or add a new customer</p>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100">
            {["No.", "ID", "Customer", "NIC", "DOB", "Phone", "City", "Actions"].map((h) => (
              <th
                key={h}
                className={`px-4 py-3 text-[11px] font-semibold text-textMuted uppercase tracking-wider first:pl-5 ${h === "Actions" ? "text-center" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {customers.map((c, index) => (
            <tr
              key={c.id}
              className="hover:bg-gray-50/70 cursor-pointer transition-colors group"
              onClick={() => navigate(`/view/${c.id}`)}
            >
              <td className="pl-5 pr-3 py-3.5 text-xs text-textMuted/40 font-mono w-10">
                {offset + index + 1}
              </td>

              <td className="px-4 py-3.5 text-xs text-textMuted/60 font-mono">{c.id}</td>

              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {c.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-textMain text-sm">{c.name}</span>
                </div>
              </td>

              <td className="px-4 py-3.5 text-sm text-textMuted font-mono">{c.nic}</td>
              <td className="px-4 py-3.5 text-sm text-textMuted">{c.dob || "—"}</td>
              <td className="px-4 py-3.5 text-sm text-textMuted">{c.phones?.[0]?.number || "—"}</td>
              <td className="px-4 py-3.5 text-sm text-textMuted">{c.addresses?.[0]?.city || "—"}</td>

              <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center gap-0.5">
                  <button
                    title="View"
                    onClick={() => navigate(`/view/${c.id}`)}
                    className="p-2 rounded-lg text-textMuted hover:text-primary hover:bg-primary/8 transition-all"
                  >
                    <FaEye size={13} />
                  </button>
                  <button
                    title="Edit"
                    onClick={() => navigate(`/edit/${c.id}`)}
                    className="p-2 rounded-lg text-textMuted hover:text-accent hover:bg-accent/8 transition-all"
                  >
                    <FaEdit size={13} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => onDeleteClick(c)}
                    className="p-2 rounded-lg text-textMuted hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}