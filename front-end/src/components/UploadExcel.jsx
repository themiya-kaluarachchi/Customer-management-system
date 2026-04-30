import { useState } from "react";
import API from "../services/api";

export default function UploadExcel() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    API.post("/customers/upload", formData)
      .then(() => alert("Upload successful"))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Upload Excel</h2>

      <input type="file"
        onChange={e => setFile(e.target.files[0])}
        className="mb-2" />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}
