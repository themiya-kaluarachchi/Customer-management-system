import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    API.get(`/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(() => toast.error("Failed to load"));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>

      <p><b>Name:</b> {customer.name}</p>
      <p><b>NIC:</b> {customer.nic}</p>
      <p><b>DOB:</b> {customer.dob}</p>

      <p><b>Phone:</b> {customer.phones?.[0]?.number}</p>

      <p><b>Address Line 1:</b> {customer.addresses?.[0]?.line1}</p>
      <p><b>Address Line 2:</b> {customer.addresses?.[0]?.line2}</p>
      <p><b>City:</b> {customer.addresses?.[0]?.city}</p>
      <p><b>Country:</b> {customer.addresses?.[0]?.country}</p>
    </div>
  );
}