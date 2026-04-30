import { FaTrash } from "react-icons/fa";

export default function DeleteModal({ target, onConfirm, onCancel }) {
  if (!target) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in">
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaTrash size={16} className="text-red-500" />
        </div>
        <h3 className="font-display font-bold text-textMain text-lg text-center mb-1">
          Delete Customer
        </h3>
        <p className="text-textMuted text-sm text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-textMain">{target.name}</span>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-textMuted hover:bg-gray-50 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}