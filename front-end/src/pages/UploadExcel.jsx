import { useState, useRef } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaFileExcel,
  FaCloudUploadAlt,
  FaUpload,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function UploadExcel() {
  const [file, setFile]           = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult]       = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const fileRef                   = useRef();

  // ── Upload logic (unchanged) ──
  const handleUpload = () => {
    if (!file) { toast.error("Please select a file first"); return; }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    API.post("/customers/upload", formData)
      .then((res) => { toast.success("Upload successful"); setResult(res.data); })
      .catch((err) => { toast.error("Failed to upload file"); console.error(err); })
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
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-display font-bold text-textMain">
          Bulk Upload
        </h1>
        <p className="text-textMuted text-sm mt-0.5">
          Import multiple customers at once using an Excel file
        </p>
      </div>

      {/* ── Format guide ── */}
      <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex gap-3">
        <FaInfoCircle size={15} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-primary mb-1">
            Required Excel Column Order
          </p>
          <p className="text-xs text-textMuted mb-2">
            Your file must have exactly these columns (row 1 = header, skip automatically):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "A — Name (required)",
              "B — Date of Birth  YYYY-MM-DD (required)",
              "C — NIC (required)",
            ].map((col) => (
              <span
                key={col}
                className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-lg font-medium"
              >
                {col}
              </span>
            ))}
          </div>
          <p className="text-xs text-textMuted mt-2">
            Supports up to <strong>1,000,000</strong> records. Large files may take a moment.
          </p>
        </div>
      </div>

      {/* ── Upload card ── */}
      <div className="bg-surface rounded-2xl shadow-card p-5">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 select-none
            ${dragOver
              ? "border-accent bg-accent/5 scale-[1.01]"
              : file
              ? "border-green-400 bg-green-50/50"
              : "border-gray-200 hover:border-primary/40 hover:bg-gray-50/60"
            }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => handleFilePick(e.target.files[0])}
          />

          {file ? (
            <>
              <FaFileExcel size={38} className="text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-textMain text-sm">{file.name}</p>
              <p className="text-textMuted text-xs mt-1">
                {(file.size / 1024).toFixed(1)} KB • Ready to upload
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                <FaTimes size={10} /> Remove file
              </button>
            </>
          ) : (
            <>
              <FaCloudUploadAlt
                size={42}
                className={`mx-auto mb-3 transition-colors ${dragOver ? "text-accent" : "text-textMuted/30"}`}
              />
              <p className="font-semibold text-textMain text-sm">
                {dragOver ? "Drop it here!" : "Drag & drop your Excel file"}
              </p>
              <p className="text-textMuted text-xs mt-1">
                or <span className="text-primary font-medium">click to browse</span> — .xlsx and .xls supported
              </p>
            </>
          )}
        </div>

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-accent hover:bg-accentDark
            disabled:opacity-50 disabled:cursor-not-allowed
            text-white py-3 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <FaUpload size={13} />
              Upload &amp; Import
            </>
          )}
        </button>
      </div>

      {/* ── Result panel ── */}
      {result && (
        <div className="bg-surface rounded-2xl shadow-card p-5 space-y-4">
          <h3 className="font-display font-semibold text-textMain">
            Upload Results
          </h3>

          {/* Summary numbers */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-display font-bold text-textMain">
                {result.totalRows}
              </p>
              <p className="text-xs text-textMuted mt-0.5">Total Rows</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-display font-bold text-green-600">
                {result.successCount}
              </p>
              <p className="text-xs text-textMuted mt-0.5">Imported</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3.5 text-center">
              <p className="text-2xl font-display font-bold text-red-500">
                {result.failureCount}
              </p>
              <p className="text-xs text-textMuted mt-0.5">Failed</p>
            </div>
          </div>

          {/* Success banner */}
          {result.failureCount === 0 && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <FaCheckCircle className="text-green-500 flex-shrink-0" size={15} />
              <p className="text-green-700 text-sm font-medium">
                All records imported successfully!
              </p>
            </div>
          )}

          {/* Error list */}
          {result.errors?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-textMain mb-2">
                Errors ({result.errors.length})
              </p>
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 space-y-1.5 max-h-52 overflow-y-auto">
                {result.errors.map((err, i) => (
                  <p
                    key={i}
                    className="text-xs text-red-600 flex items-start gap-1.5"
                  >
                    <FaTimesCircle size={10} className="flex-shrink-0 mt-0.5" />
                    {err}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}