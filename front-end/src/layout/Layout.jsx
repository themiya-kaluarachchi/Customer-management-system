import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

export default function Layout() {
  return (
    <div className="w-64 bg-primary text-white p-4 flex flex-col">

  {/* LOGO */}
  <div className="flex items-center gap-3 mb-8">
    <img src={logo} alt="logo" className="w-10 h-10" />
    <span className="text-xl font-bold tracking-wide">CMS</span>
  </div>

  {/* MENU */}
  <ul className="space-y-2 flex-1">

    <li>
      <Link
        to="/"
        className="block px-4 py-2 rounded-lg hover:bg-secondary transition"
      >
        Dashboard
      </Link>
    </li>

    <li>
      <Link
        to="/customers"
        className="block px-4 py-2 rounded-lg hover:bg-secondary transition"
      >
        Customers
      </Link>
    </li>

    <li>
      <Link
        to="/add"
        className="block px-4 py-2 rounded-lg hover:bg-secondary transition"
      >
        Add Customer
      </Link>
    </li>

    <li>
      <Link
        to="/upload"
        className="block px-4 py-2 rounded-lg hover:bg-secondary transition"
      >
        Upload Excel
      </Link>
    </li>

  </ul>

</div>
  );
}
