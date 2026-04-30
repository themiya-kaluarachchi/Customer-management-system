import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ searchId, onChange, onSearch, onClear }) {
  return (
    <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-2 items-center">
      <div className="relative">
        <FaSearch
          size={12}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted"
        />
        <input
          className="pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all bg-gray-50 focus:bg-white"
          placeholder="Search by ID…"
          value={searchId}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>

      <button
        onClick={onSearch}
        className="bg-primary hover:bg-secondary text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
      >
        Search
      </button>

      {searchId && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-textMuted border border-gray-200 hover:bg-gray-50 px-3 py-2.5 rounded-xl text-sm transition-colors"
        >
          <FaTimes size={11} /> Clear
        </button>
      )}
    </div>
  );
}