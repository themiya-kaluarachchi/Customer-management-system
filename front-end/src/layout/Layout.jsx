import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarContent from "../components/layout/SidebarContent";
import MobileTopBar from "../components/layout/MobileTopBar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background font-body overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-64 bg-primary flex-col flex-shrink-0 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Sidebar — Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-primary flex flex-col z-30 shadow-2xl
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <MobileTopBar onMenuOpen={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}