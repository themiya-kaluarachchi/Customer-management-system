import { FaSearch, FaTimes, FaFileExcel } from "react-icons/fa";

export default function SearchBar({
  searchQuery,
  onChange,
  onClear,
  onExport,
  exporting = false,
  totalShown,
  totalAll,
}) {
  return (
    <div
      className="px-5 py-4 flex flex-wrap gap-2 items-center justify-between"
      style={{ borderBottom: "1px solid #f1f5f9" }}
    >
      {/* ── Left: search input ── */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative">
          <FaSearch
            size={12}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--color-textMuted)" }}
          />
          <input
            className="pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl w-64
              focus:outline-none transition-all bg-gray-50 focus:bg-white"
            style={{
              "--tw-ring-color": "rgba(15,76,92,0.25)",
              focusBorderColor: "var(--color-primary)",
            }}
            placeholder="Search by name or NIC…"
            value={searchQuery}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        {/* Clear button — only shown when there is a query */}
        {searchQuery && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-sm border border-gray-200 hover:bg-gray-50
              px-3 py-2.5 rounded-xl transition-colors"
            style={{ color: "var(--color-textMuted)" }}
          >
            <FaTimes size={11} /> Clear
          </button>
        )}

        {/* Record count badge */}
        {totalAll !== undefined && (
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              backgroundColor: "rgba(15,76,92,0.08)",
              color: "var(--color-primary)",
            }}
          >
            {searchQuery
              ? `${totalShown} of ${totalAll} records`
              : `${totalAll} total records`}
          </span>
        )}
      </div>

      {/* ── Right: Export button ── */}
      <button
        onClick={onExport}
        disabled={exporting}
        className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm
          font-medium shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed
          hover:-translate-y-0.5"
        style={{ backgroundColor: "#217346" }} 
        onMouseEnter={(e) => {
          if (!exporting) e.currentTarget.style.backgroundColor = "#185c38";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#217346";
        }}
      >
        {exporting ? (
          <>
            <div
              className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
            />
            Exporting…
          </>
        ) : (
          <>
            <FaFileExcel size={13} />
            Export Excel
          </>
        )}
      </button>
    </div>
  );
}