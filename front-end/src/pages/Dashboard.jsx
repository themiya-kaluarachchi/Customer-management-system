import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaUsers, FaPhone, FaMapMarkerAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import StatCards from "../components/dashboard/StatCards";
import RecentCustomers from "../components/dashboard/RecentCustomers";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const total = customers.length;
  const withPhone = customers.filter((c) => c.phones?.length).length;
  const withAddress = customers.filter((c) => c.addresses?.length).length;
  const recent = [...customers].sort((a, b) => b.id - a.id).slice(0, 5);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
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

      {/* Header */}
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
          <FaUserPlus size={13} /> Add Customer
        </Link>
      </div>

      <StatCards stats={stats} loading={loading} />

      <RecentCustomers recent={recent} loading={loading} />
    </div>
  );
}