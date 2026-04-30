import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function UploadResult({ result }) {
  if (!result) return null;

  return (
    <div className="bg-surface rounded-2xl shadow-card p-5 space-y-4">
      <h3 className="font-display font-semibold text-textMain">Upload Results</h3>

      {/* Summary numbers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-display font-bold text-textMain">{result.totalRows}</p>
          <p className="text-xs text-textMuted mt-0.5">Total Rows</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-display font-bold text-green-600">{result.successCount}</p>
          <p className="text-xs text-textMuted mt-0.5">Imported</p>
        </div>
        <div className="bg-red-50 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-display font-bold text-red-500">{result.failureCount}</p>
          <p className="text-xs text-textMuted mt-0.5">Failed</p>
        </div>
      </div>

      {/* Success banner */}
      {result.failureCount === 0 && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <FaCheckCircle className="text-green-500 flex-shrink-0" size={15} />
          <p className="text-green-700 text-sm font-medium">All records imported successfully!</p>
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
              <p key={i} className="text-xs text-red-600 flex items-start gap-1.5">
                <FaTimesCircle size={10} className="flex-shrink-0 mt-0.5" />
                {err}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}