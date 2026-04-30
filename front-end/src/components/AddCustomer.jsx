import { useState } from "react";
import API from "../services/api";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    nic: "",
    dob: ""
  });

  const handleSubmit = () => {
    API.post("/customers", form)
      .then(() => alert("Customer added"))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Add Customer</h2>

      <input className="border p-2 mr-2"
        placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />

      <input className="border p-2 mr-2"
        placeholder="NIC"
        onChange={e => setForm({...form, nic: e.target.value})} />

      <input className="border p-2 mr-2"
        type="date"
        onChange={e => setForm({...form, dob: e.target.value})} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}