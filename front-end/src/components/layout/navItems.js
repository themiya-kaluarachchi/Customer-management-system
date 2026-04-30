import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaFileExcel,
} from "react-icons/fa";

const navItems = [
  { to: "/",  label: "Dashboard",  icon: FaTachometerAlt, exact: true },
  { to: "/customers",label: "Customers",  icon: FaUsers },
  { to: "/add",  label: "Add Customer",  icon: FaUserPlus },
  { to: "/upload",  label: "Upload Excel",  icon: FaFileExcel },
];

export default navItems;