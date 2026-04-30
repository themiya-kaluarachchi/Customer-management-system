import { useEffect, useState } from "react";
import API from "../services/api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    API.get("/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Customers</h2>

      {customers.map(c => (
        <div key={c.id} className="border-b py-1">
          {c.name} - {c.nic}
        </div>
      ))}
    </div>
  );
}