import { useEffect, useState } from "react";
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const fetchCustomers = () => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load customers"));
  };

  const location = useLocation();

  useEffect(() => {
    fetchCustomers();
  }, [location]);

  // SEARCH
  const handleSearch = () => {
    if (!searchId) {
      fetchCustomers();
      return;
    }

    API.get(`/customers/${searchId}`)
      .then((res) => setCustomers([res.data]))
      .catch(() => toast.error("Customer not found"));
  };

  // 🗑 DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    API.delete(`/customers/${id}`)
      .then(() => {
        toast.success("Deleted successfully");
        fetchCustomers();
      })
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Customers</h2>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">NIC</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/view/${c.id}`)}
            >
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.nic}</td>
              <td className="border p-2">{c.dob}</td>
              <td className="border p-2">{c.phones?.[0]?.number || "-"}</td>
              <td className="border p-2">{c.addresses?.[0]?.city || "-"}</td>

              <td className="border p-2 flex justify-center gap-4">
                {/* EDIT */}
                <button
                  className="text-blue-400 hover:text-blue-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${c.id}`);
                  }}
                >
                  <FaEdit />
                </button>

                {/* DELETE */}
                <button
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(c.id);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
