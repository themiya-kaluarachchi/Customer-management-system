import { Toaster } from "react-hot-toast";
import AddCustomer from "./pages/AddCustomer";
import UploadExcel from "./pages/UploadExcel";
import CustomerList from "./pages/CustomerList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import CustomerDetails from "./pages/CustomerDetails";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      {/* Toast notifications styled to match brand */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0F4C5C",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "13px",
            fontFamily: "DM Sans, sans-serif",
            padding: "12px 16px",
            boxShadow: "0 10px 40px -10px rgba(15,76,92,0.4)",
          },
          success: {
            iconTheme: { primary: "#F08A24", secondary: "#fff" },
          },
          error: {
            style: { background: "#ef4444" },
            iconTheme: { primary: "#fff", secondary: "#ef4444" },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/"       element={<LandingPage />} />
          <Route  element={<Layout />}>
            <Route path="dashboard"  element={<Dashboard />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="add" element={<AddCustomer />} />
            <Route path="edit/:id" element={<AddCustomer />} />
            <Route path="upload" element={<UploadExcel />} />
            <Route path="view/:id" element={<CustomerDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;