import { Toaster } from "react-hot-toast";
import AddCustomer from "./components/AddCustomer";
import UploadExcel from "./components/UploadExcel";
import CustomerList from "./components/CustomerList";

function App() {
  <Toaster position="top-right" />
 
  return (
   <div className="max-w-3xl mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-4">
      Customer Management
    </h1>

    <AddCustomer />
    <UploadExcel />
    <CustomerList />

   </div>
  )
}

export default App
