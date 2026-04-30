import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="text-xl font-bold">CMS</span>
        </div>

        <ul className="space-y-2">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/add">Add Customer</Link>
          </li>
          <li>
            <Link to="/upload">Upload Excel</Link>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
