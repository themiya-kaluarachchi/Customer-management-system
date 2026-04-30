export default function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-primary/8 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={12} />
      </div>
      <div>
        <p className="text-[10px] font-semibold text-textMuted uppercase tracking-widest">
          {label}
        </p>
        <p className="text-textMain font-medium text-sm mt-0.5">{value || "—"}</p>
      </div>
    </div>
  );
}