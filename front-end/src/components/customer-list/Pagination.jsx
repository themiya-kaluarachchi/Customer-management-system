import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
      <p className="text-xs text-textMuted">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-textMuted hover:text-textMain hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <FaChevronLeft size={11} />
        </button>

        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-textMuted text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all
                ${page === currentPage
                  ? "bg-primary text-white shadow-sm"
                  : "text-textMuted hover:bg-gray-100 hover:text-textMain"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-textMuted hover:text-textMain hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <FaChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}