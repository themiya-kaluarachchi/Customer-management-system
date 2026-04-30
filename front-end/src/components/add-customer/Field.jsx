export default function Field({ label, icon: Icon, required, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-textMuted uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted pointer-events-none"
          />
        )}
        <input
          className={`w-full ${Icon ? "pl-9" : "pl-3.5"} pr-3.5 py-2.5 text-sm border border-gray-200 rounded-xl
            bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary
            transition-all placeholder:text-gray-300`}
          {...props}
        />
      </div>
    </div>
  );
}