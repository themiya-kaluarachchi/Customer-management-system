import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import FormatGuide from "../components/upload-excel/FormatGuide";
import DropZone from "../components/upload-excel/DropZone";
import UploadResult from "../components/upload-excel/UploadResult";

export default function UploadExcel() {
  const [file, setFile]           = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult]       = useState(null);
  const [dragOver, setDragOver]   = useState(false);

  const handleUpload = () => {
    if (!file) { toast.error("Please select a file first"); return; }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setResult(null);

    API.post("/customers/upload", formData)
      .then((res) => {
        setResult(res.data);  
        if (res.data.failureCount === 0) {
          toast.success(`Imported ${res.data.successCount} records successfully`);
        } else {
          toast.error(`${res.data.failureCount} rows failed — check errors below`);
        }
      })
      .catch((err) => {
        const data = err.response?.data;
        if (data && typeof data === "object") {
          setResult(data);
        }
        toast.error("Upload failed — check errors below");
      })
      .finally(() => setUploading(false));
  };

  const handleFilePick = (picked) => {
    if (picked) { setFile(picked); setResult(null); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFilePick(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold text-textMain">Bulk Upload</h1>
        <p className="text-textMuted text-sm mt-0.5">
          Import multiple customers at once using an Excel file
        </p>
      </div>

      <FormatGuide />

      <DropZone
        file={file}
        dragOver={dragOver}
        uploading={uploading}
        onFilePick={handleFilePick}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onRemove={() => { setFile(null); setResult(null); }}
        onUpload={handleUpload}
      />

      <UploadResult result={result} />
    </div>
  );
}