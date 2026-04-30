import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Field from "../components/add-customer/Field";
import Section from "../components/add-customer/Section";

export default function AddCustomer() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nic: "",
    dob: "",
    phones:    [{ number: "" }],
    addresses: [{ line1: "", line2: "", city: "", country: "" }],
  });

  useEffect(() => {
    if (id) {
      API.get(`/customers/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => toast.error("Failed to load customer"));
    }
  }, [id]);

  const handleSubmit = () => {
    if (!form.name || !form.nic || !form.dob) {
      toast.error("Fill required fields");
      return;
    }

    const payload = {
      name: form.name,
      nic: form.nic,
      dob: form.dob,
      phones: form.phones[0]?.number ? form.phones  : [],
      addresses: form.addresses[0]?.line1 ? form.addresses : [],
    };

    if (id) {
      API.put(`/customers/${id}`, payload)
        .then(() => { toast.success("Updated successfully"); navigate("/customers"); })
        .catch(() => toast.error("Update failed"));
    } else {
      API.post("/customers", payload)
        .then(() => { toast.success("Customer added"); navigate("/customers"); })
        .catch(() => toast.error("Create failed"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/customers"
          className="p-2.5 rounded-xl border border-gray-200 bg-surface hover:bg-gray-50 text-textMuted hover:text-textMain transition-all shadow-sm"
        >
          <FaArrowLeft size={13} />
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-textMain">
            {id ? "Edit Customer" : "Add Customer"}
          </h1>
          <p className="text-textMuted text-sm">
            {id ? "Update customer information" : "Create a new customer record"}
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <Section title="Basic Information" icon={FaUser}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field
              label="Full Name" icon={FaUser} placeholder="Enter full name" required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <Field
            label="NIC Number" icon={FaIdCard} placeholder="e.g. 199512345678" required
            value={form.nic}
            onChange={(e) => setForm({ ...form, nic: e.target.value })}
          />
          <Field
            label="Date of Birth" icon={FaCalendarAlt} type="date" required
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
        </div>
      </Section>

      {/* Phone */}
      <Section title="Contact Number" icon={FaPhone}>
        <Field
          label="Mobile Number" icon={FaPhone} placeholder="e.g. 0771234567"
          value={form.phones[0]?.number || ""}
          onChange={(e) =>
            setForm({ ...form, phones: [{ number: e.target.value }] })
          }
        />
      </Section>

      {/* Address */}
      <Section title="Address" icon={FaMapMarkerAlt}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field
              label="Address Line 1" placeholder="Street address"
              value={form.addresses[0]?.line1 || ""}
              onChange={(e) =>
                setForm({ ...form, addresses: [{ ...form.addresses[0], line1: e.target.value }] })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Address Line 2" placeholder="Apartment, suite, etc. (optional)"
              value={form.addresses[0]?.line2 || ""}
              onChange={(e) =>
                setForm({ ...form, addresses: [{ ...form.addresses[0], line2: e.target.value }] })
              }
            />
          </div>
          <Field
            label="City" placeholder="City"
            value={form.addresses[0]?.city || ""}
            onChange={(e) =>
              setForm({ ...form, addresses: [{ ...form.addresses[0], city: e.target.value }] })
            }
          />
          <Field
            label="Country" placeholder="Country"
            value={form.addresses[0]?.country || ""}
            onChange={(e) =>
              setForm({ ...form, addresses: [{ ...form.addresses[0], country: e.target.value }] })
            }
          />
        </div>
      </Section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pb-6">
        <Link
          to="/customers"
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-textMuted hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-accent hover:bg-accentDark text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
        >
          <FaSave size={12} />
          {id ? "Update Customer" : "Save Customer"}
        </button>
      </div>
    </div>
  );
}