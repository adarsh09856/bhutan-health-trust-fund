import React, { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin-auth";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { Loader2 } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAdminAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.navigate({ to: "/admin/login" });
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-slate-300">Authenticating BHTF Admin Portal...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex bg-slate-50 text-foreground overflow-hidden">
      {/* Desktop Sidebar (Fixed height, internal scroll only) */}
      <div className="hidden lg:flex lg:flex-col lg:h-screen lg:shrink-0 sticky top-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 z-10">
            <AdminSidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area (Header pinned at top, only content container scrolls) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <div className="sticky top-0 z-30 shrink-0">
          <AdminHeader onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
