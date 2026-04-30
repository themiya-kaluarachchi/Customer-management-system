export default function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-surface rounded-2xl shadow-card p-5">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon size={12} />
        </div>
        <h2 className="text-xs font-bold text-textMuted uppercase tracking-widest">
          {title}
        </h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}