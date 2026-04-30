export default function ProfileBanner({ customer }) {
  return (
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      <div className="h-20 bg-gradient-to-r from-primary via-secondary to-primaryLight" />
      <div className="px-5 pb-5 -mt-8">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border-2 border-white flex items-center justify-center text-2xl font-display font-bold text-primary mb-3">
          {customer.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-display font-bold text-textMain">
          {customer.name}
        </h2>
        <p className="text-textMuted text-sm mt-0.5 font-mono">{customer.nic}</p>
      </div>
    </div>
  );
}