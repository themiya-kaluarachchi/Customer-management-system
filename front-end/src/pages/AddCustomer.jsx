import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    nic: "",
    dob: "",
    phones: [{ number: "" }],
    addresses: [{ line1: "", line2: "", city: "", country: "" }],
  });

  //  LOAD CUSTOMER FOR EDIT
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
      phones: form.phones[0]?.number ? form.phones : [],
      addresses: form.addresses[0]?.line1 ? form.addresses : [],
    };

    if (id) {
      API.put(`/customers/${id}`, payload)
        .then(() => {
          toast.success("Updated successfully");
          navigate("/customers");
        })
        .catch(() => toast.error("Update failed"));
    } else {
      API.post("/customers", payload)
        .then(() => {
          toast.success("Customer added");
          navigate("/customers");
        })
        .catch(() => toast.error("Create failed"));
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Customer" : "Add Customer"}
      </h2>

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="NIC"
        value={form.nic}
        onChange={(e) => setForm({ ...form, nic: e.target.value })}
      />

      <input
        className="border p-2 mr-2 mb-2"
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="Phone"
        value={form.phones[0]?.number || ""}
        onChange={(e) =>
          setForm({
            ...form,
            phones: [{ number: e.target.value }],
          })
        }
      />

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="Address Line 1"
        value={form.addresses[0]?.line1 || ""}
        onChange={(e) =>
          setForm({
            ...form,
            addresses: [{ ...form.addresses[0], line1: e.target.value }],
          })
        }
      />

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="Address Line 2"
        value={form.addresses[0]?.line2 || ""}
        onChange={(e) =>
          setForm({
            ...form,
            addresses: [{ ...form.addresses[0], line2: e.target.value }],
          })
        }
      />

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="City"
        value={form.addresses[0]?.city || ""}
        onChange={(e) =>
          setForm({
            ...form,
            addresses: [{ ...form.addresses[0], city: e.target.value }],
          })
        }
      />

      <input
        className="border p-2 mr-2 mb-2"
        placeholder="Country"
        value={form.addresses[0]?.country || ""}
        onChange={(e) =>
          setForm({
            ...form,
            addresses: [{ ...form.addresses[0], country: e.target.value }],
          })
        }
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        {id ? "Update" : "Save"}
      </button>
    </div>
  );
}
