import { Toaster } from "react-hot-toast";
import AddCustomer from "./pages/AddCustomer";
import UploadExcel from "./pages/UploadExcel";
import CustomerList from "./pages/CustomerList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import CustomerDetails from "./pages/CustomerDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          
            <Route index element={<Dashboard />} />
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
