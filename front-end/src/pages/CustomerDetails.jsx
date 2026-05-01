import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaArrowLeft, FaEdit, FaUser, FaIdCard,
  FaCalendarAlt, FaPhone, FaMapMarkerAlt, FaUsers,
} from "react-icons/fa";
import InfoRow from "../components/customer-details/InfoRow";
import ProfileBanner from "../components/customer-details/ProfileBanner";
import FamilyTab from "../components/customer-details/FamilyTab";

const TABS = [
  { key: "profile", label: "Profile",        icon: FaUser  },
  { key: "family",  label: "Family Members", icon: FaUsers },
];

export default function CustomerDetails() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    API.get(`/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch(() => toast.error("Failed to load"));
  }, [id]);

  if (!customer)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-textMuted text-sm">Loading customer…</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-gray-200 bg-surface hover:bg-gray-50 text-textMuted hover:text-textMain transition-all shadow-sm"
          >
            <FaArrowLeft size={13} />
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-textMain">Customer Profile</h1>
            <p className="text-textMuted text-sm">Record #{id}</p>
          </div>
        </div>
        <Link
          to={`/edit/${id}`}
          className="flex items-center gap-2 bg-accent hover:bg-accentDark text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
        >
          <FaEdit size={12} /> Edit
        </Link>
      </div>

      {/* Profile banner */}
      <ProfileBanner customer={customer} />

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
              ${activeTab === key
                ? "bg-white text-textMain shadow-sm"
                : "text-textMuted hover:text-textMain"
              }`}
          >
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === "profile" && (
        <>
          <div className="bg-surface rounded-2xl shadow-card p-5">
            <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1">
              Personal Information
            </p>
            <InfoRow icon={FaUser} label="Full Name" value={customer.name} />
            <InfoRow icon={FaIdCard}label="NIC Number"  value={customer.nic} />
            <InfoRow icon={FaCalendarAlt} label="Date of Birth" value={customer.dob} />
            <InfoRow icon={FaPhone}  label="Phone"   value={customer.phones?.[0]?.number} />
          </div>

          {customer.addresses?.[0]?.line1 && (
            <div className="bg-surface rounded-2xl shadow-card p-5">
              <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1">
                Address
              </p>
              <InfoRow icon={FaMapMarkerAlt} label="Address Line 1" value={customer.addresses[0].line1} />
              {customer.addresses[0].line2 && (
                <InfoRow icon={FaMapMarkerAlt} label="Address Line 2" value={customer.addresses[0].line2} />
              )}
              <InfoRow icon={FaMapMarkerAlt} label="City"    value={customer.addresses[0].city} />
              <InfoRow icon={FaMapMarkerAlt} label="Country" value={customer.addresses[0].country} />
            </div>
          )}
        </>
      )}

      {/* Family tab */}
      {activeTab === "family" && <FamilyTab customerId={id} />}
    </div>
  );
}