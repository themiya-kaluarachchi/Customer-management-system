import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";
import { FaUserPlus, FaTimes, FaSearch, FaUsers, FaEye } from "react-icons/fa";

export default function FamilyTab({ customerId }) {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Load linked family members
  const loadMembers = async () => {
    setLoadingMembers(true);
    try {
      const res = await API.get(`/customers/${customerId}/family`);
      setMembers(res.data);
    } catch {
      toast.error("Failed to load family members");
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => loadMembers());
  }, [customerId]);

  // Search all customers to find someone to link
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    API.get("/customers")
      .then((res) => {
        const q = searchQuery.toLowerCase();
        const filtered = res.data.filter(
          (c) =>
            c.id !== Number(customerId) &&
            !members.find((m) => m.id === c.id) &&
            (c.name?.toLowerCase().includes(q) ||
              c.nic?.toLowerCase().includes(q)),
        );
        setSearchResults(filtered);
      })
      .catch(() => toast.error("Search failed"))
      .finally(() => setSearching(false));
  };

  const handleLink = (member) => {
    API.post(`/customers/${customerId}/family/${member.id}`)
      .then(() => {
        toast.success(`${member.name} linked as family member`);
        setShowSearch(false);
        setSearchQuery("");
        setSearchResults([]);
        loadMembers();
      })
      .catch(() => toast.error("Failed to link family member"));
  };

  const handleUnlink = (member) => {
    API.delete(`/customers/${customerId}/family/${member.id}`)
      .then(() => {
        toast.success(`${member.name} removed from family`);
        loadMembers();
      })
      .catch(() => toast.error("Failed to remove family member"));
  };

  return (
    <div className="bg-surface rounded-2xl shadow-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest">
            Family Members
          </p>
          <p className="text-textMuted text-xs mt-0.5">
            {loadingMembers ? "Loading…" : `${members.length} linked`}
          </p>
        </div>
        <button
          onClick={() => {
            setShowSearch(!showSearch);
            setSearchResults([]);
            setSearchQuery("");
          }}
          className="flex items-center gap-2 bg-accent hover:bg-accentDark text-white px-3 py-2 rounded-xl text-xs font-medium transition-all shadow-sm"
        >
          <FaUserPlus size={11} />
          {showSearch ? "Cancel" : "Add Member"}
        </button>
      </div>

      {/* Search panel */}
      {showSearch && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-textMuted">
            Search by name or NIC
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FaSearch
                size={11}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted"
              />
              <input
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                placeholder="e.g. Kamal or 199512345678"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching}
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {searching ? "…" : "Search"}
            </button>
          </div>

          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {searchResults.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {c.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-textMain">
                        {c.name}
                      </p>
                      <p className="text-xs text-textMuted font-mono">
                        {c.nic}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLink(c)}
                    className="text-xs text-accent hover:text-accentDark font-semibold border border-accent/30 hover:border-accent px-3 py-1.5 rounded-lg transition-all"
                  >
                    Link
                  </button>
                </div>
              ))}
            </div>
          )}

          {searchResults.length === 0 && searchQuery && !searching && (
            <p className="text-xs text-textMuted text-center py-2">
              No matching customers found
            </p>
          )}
        </div>
      )}

      {/* Linked members list */}
      {loadingMembers ? (
        <div className="py-8 text-center">
          <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : members.length === 0 ? (
        <div className="py-10 text-center text-textMuted">
          <FaUsers size={28} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No family members linked</p>
          <p className="text-xs mt-1">
            Use the button above to link existing customers
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-100/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {m.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-textMain">{m.name}</p>
                  <p className="text-xs text-textMuted font-mono">{m.nic}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  title="View profile"
                  onClick={() => navigate(`/view/${m.id}`)}
                  className="p-2 rounded-lg text-textMuted hover:text-primary hover:bg-primary/8 transition-all"
                >
                  <FaEye size={13} />
                </button>
                <button
                  title="Remove link"
                  onClick={() => handleUnlink(m)}
                  className="p-2 rounded-lg text-textMuted hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
