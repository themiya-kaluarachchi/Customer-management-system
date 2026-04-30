import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUserPlus,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // for modal
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCustomers = () => {
    setLoading(true);
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load customers"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const res = await API.get("/customers");

        if (isMounted) {
          setCustomers(res.data);
        }
      } catch {
        toast.error("Failed to load customers");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  // ── SEARCH (logic unchanged) ──
  const handleSearch = () => {
    if (!searchId) {
      fetchCustomers();
      return;
    }
    API.get(`/customers/${searchId}`)
      .then((res) => setCustomers([res.data]))
      .catch(() => toast.error("Customer not found"));
  };

  const handleClear = () => {
    setSearchId("");
    fetchCustomers();
  };

  // ── DELETE (logic unchanged) ──
  const confirmDelete = () => {
    if (!deleteTarget) return;
    API.delete(`/customers/${deleteTarget.id}`)
      .then(() => {
        toast.success("Deleted successfully");
        setDeleteTarget(null);
        fetchCustomers();
      })
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-textMain">
            Customers
          </h1>
          <p className="text-textMuted text-sm">
            {loading ? "Loading…" : `${customers.length} total records`}
          </p>
        </div>
        <Link
          to="/add"
          className="flex items-center gap-2 bg-accent hover:bg-accentDark text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all w-fit"
        >
          <FaUserPlus size={13} /> Add Customer
        </Link>
      </div>

      {/* ── Main Card ── */}
      <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
        {/* Search bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-2 items-center">
          <div className="relative">
            <FaSearch
              size={12}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted"
            />
            <input
              className="pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all bg-gray-50 focus:bg-white"
              placeholder="Search by ID…"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-primary hover:bg-secondary text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Search
          </button>

          {searchId && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-textMuted border border-gray-200 hover:bg-gray-50 px-3 py-2.5 rounded-xl text-sm transition-colors"
            >
              <FaTimes size={11} /> Clear
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-14 text-center">
            <div className="w-9 h-9 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-textMuted text-sm">Loading customers…</p>
          </div>
        ) : customers.length === 0 ? (
          <div className="p-14 text-center text-textMuted">
            <FaSearch size={28} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">No customers found</p>
            <p className="text-xs mt-1">
              Try a different search or add a new customer
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  {[
                    "#",
                    "Customer",
                    "NIC",
                    "DOB",
                    "Phone",
                    "City",
                    "Actions",
                  ].map((h) => (
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
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50/70 cursor-pointer transition-colors group"
                    onClick={() => navigate(`/view/${c.id}`)}
                  >
                    <td className="pl-5 pr-3 py-3.5 text-xs text-textMuted/60 font-mono">
                      {c.id}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-textMain text-sm">
                          {c.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-sm text-textMuted font-mono text-xs">
                      {c.nic}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-textMuted">
                      {c.dob || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-textMuted">
                      {c.phones?.[0]?.number || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-textMuted">
                      {c.addresses?.[0]?.city || "—"}
                    </td>

                    {/* Actions */}
                    <td
                      className="px-4 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                          onClick={() => setDeleteTarget(c)}
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
        )}
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaTrash size={16} className="text-red-500" />
            </div>
            <h3 className="font-display font-bold text-textMain text-lg text-center mb-1">
              Delete Customer
            </h3>
            <p className="text-textMuted text-sm text-center mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-textMain">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-gray-200 text-textMuted hover:bg-gray-50 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
