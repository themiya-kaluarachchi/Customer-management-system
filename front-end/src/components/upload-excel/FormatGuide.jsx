import { FaInfoCircle } from "react-icons/fa";

const columns = [
  "A — Name (required)",
  "B — Date of Birth  YYYY-MM-DD (required)",
  "C — NIC (required)",
];

export default function FormatGuide() {
  return (
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
          {columns.map((col) => (
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
  );
}