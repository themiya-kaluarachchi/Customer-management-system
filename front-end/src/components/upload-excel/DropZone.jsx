import { useRef } from "react";
import { FaFileExcel, FaCloudUploadAlt, FaTimes, FaUpload } from "react-icons/fa";

export default function DropZone({ file, dragOver, uploading, onFilePick, onDrop, onDragOver, onDragLeave, onRemove, onUpload }) {
  const fileRef = useRef();

  return (
    <div className="bg-surface rounded-2xl shadow-card p-5">
      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
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
          onChange={(e) => onFilePick(e.target.files[0])}
        />

        {file ? (
          <>
            <FaFileExcel size={38} className="text-green-500 mx-auto mb-3" />
            <p className="font-semibold text-textMain text-sm">{file.name}</p>
            <p className="text-textMuted text-xs mt-1">
              {(file.size / 1024).toFixed(1)} KB • Ready to upload
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
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
        onClick={onUpload}
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
  );
}