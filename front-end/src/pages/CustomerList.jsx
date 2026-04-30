import { useEffect, useState } from "react";
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
  const [customers, setCustomers]       = useState([]);
  const [searchId, setSearchId]         = useState("");
  const [loading, setLoading]           = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage]   = useState(1);
  const location = useLocation();

  const fetchCustomers = () => {
    setLoading(true);
    API.get("/customers")
      .then((res) => { setCustomers(res.data); setCurrentPage(1); })
      .catch(() => toast.error("Failed to load customers"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
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

    loadData();
    return () => { isMounted = false; };
  }, [location.pathname]);

  const handleSearch = () => {
    if (!searchId) { fetchCustomers(); return; }
    API.get(`/customers/${searchId}`)
      .then((res) => { setCustomers([res.data]); setCurrentPage(1); })
      .catch(() => toast.error("Customer not found"));
  };

  const handleClear = () => {
    setSearchId("");
    fetchCustomers();
  };

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

  // ── Pagination derived state ──
  const totalPages = Math.ceil(customers.length / PAGE_SIZE);
  const paginated  = customers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-5 max-w-6xl mx-auto">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-textMain">Customers</h1>
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

      {/* Main Card */}
      <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
        <SearchBar
          searchId={searchId}
          onChange={setSearchId}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <CustomerTable
          customers={paginated}
          loading={loading}
          onDeleteClick={setDeleteTarget}
          offset={(currentPage -1) * PAGE_SIZE}
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