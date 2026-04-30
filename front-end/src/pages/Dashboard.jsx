import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaUsers, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    API.get("/customers")
      .then((res) => setCustomers(res.data))
      .catch(() => toast.error("Failed to load dashboard"));
  }, []);

  const total = customers.length;
  const withPhone = customers.filter(c => c.phones?.length).length;
  const withAddress = customers.filter(c => c.addresses?.length).length;

  const recent = [...customers]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-xl shadow flex items-center justify-between hover:scale-105 transition shadow-lg">
          <div>
            <p>Total Customers</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>
          <FaUsers size={30} />
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-xl shadow flex items-center justify-between hover:scale-105 transition shadow-lg">
          <div>
            <p>With Phone</p>
            <h2 className="text-2xl font-bold">{withPhone}</h2>
          </div>
          <FaPhone size={30} />
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-5 rounded-xl shadow flex items-center justify-between hover:scale-105 transition shadow-lg">
          <div>
            <p>With Address</p>
            <h2 className="text-2xl font-bold">{withAddress}</h2>
          </div>
          <FaMapMarkerAlt size={30} />
        </div>

      </div>

      {/*  RECENT TABLE */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">NIC</th>
              <th className="p-2 border">City</th>
            </tr>
          </thead>

          <tbody>
            {recent.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.nic}</td>
                <td className="border p-2">
                  {c.addresses?.[0]?.city || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}