import { useEffect, useState, useMemo } from "react";
import API from "../services/api";
import { FaUserPlus } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBar from "../components/customer-list/SearchBar";
import CustomerTable from "../components/customer-list/CustomerTable";
import DeleteModal from "../components/customer-list/DeleteModal";
import Pagination from "../components/customer-list/Pagination";

const PAGE_SIZE = 10;

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);      
  const [searchQuery, setSearchQuery] = useState("");      
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);   
  const location = useLocation();

  // ── Fetch all customers ─────
  const fetchCustomers = () => {
    setLoading(true);
    API.get("/customers")
      .then((res) => { setCustomers(res.data); setCurrentPage(1); })
      .catch(() => toast.error("Failed to load customers"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await API.get("/customers");
        if (isMounted) { setCustomers(res.data); setCurrentPage(1); }
      } catch {
        toast.error("Failed to load customers");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [location.pathname]);

  
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.nic  && c.nic.toLowerCase().includes(q))
    );
  }, [customers, searchQuery]);

  // ── Clear search ───
  const handleClear = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // ── Delete (logic unchanged) ───
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

  // ── Export to Excel ─
  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await API.get("/customers/export", {
        responseType: "blob",                      
      });

      // Build a temporary object URL and click it
      const url      = window.URL.createObjectURL(new Blob([response.data]));
      const link     = document.createElement("a");
      const today    = new Date().toISOString().split("T")[0];
      link.href      = url;
      link.setAttribute("download", `customers_${today}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);             

      toast.success("Export downloaded!");
    } catch {
      toast.error("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  // ── Pagination ───
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-5 max-w-6xl mx-auto">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-display font-bold"
            style={{ color: "var(--color-textMain)" }}
          >
            Customers
          </h1>
          <p className="text-sm" style={{ color: "var(--color-textMuted)" }}>
            {loading ? "Loading…" : `${customers.length} total records`}
          </p>
        </div>
        <Link
          to="/add"
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl font-medium
            text-sm shadow-md transition-all w-fit hover:-translate-y-0.5"
          style={{ backgroundColor: "var(--color-accent)" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-accentDark)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--color-accent)"}
        >
          <FaUserPlus size={13} /> Add Customer
        </Link>
      </div>

      {/* ── Main card ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* SearchBar now handles name/NIC filter + export */}
        <SearchBar
          searchQuery={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClear}
          onExport={handleExport}
          exporting={exporting}
          totalShown={filtered.length}
          totalAll={customers.length}
        />

        <CustomerTable
          customers={paginated}
          loading={loading}
          onDeleteClick={setDeleteTarget}
          offset={(currentPage - 1) * PAGE_SIZE}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteModal
        target={deleteTarget}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}