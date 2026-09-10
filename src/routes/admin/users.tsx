import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getUserSessions,
  revokeUserSession,
} from "@/lib/api/admin.functions";
import type { UserSession } from "@/lib/db/schema";
import {
  Users,
  Plus,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Key,
  Trash2,
  Edit2,
  Activity,
  Loader2,
  Lock,
  Calendar,
  Laptop,
  CheckCircle2,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [{ title: "User & Role Management | BHTF Admin" }],
  }),
  component: AdminUsersPage,
});

interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  failedAttempts: number;
  lockedUntil: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function AdminUsersPage() {
  const { user: currentUser } = useAdminAuth();
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR" as "SUPER_ADMIN" | "EDITOR",
    reason: "",
  });
  const [editUser, setEditUser] = useState<SafeUser | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "EDITOR" as "SUPER_ADMIN" | "EDITOR",
    isActive: true,
    newPassword: "",
    reason: "",
  });

  // Sessions state
  const [selectedUserForSessions, setSelectedUserForSessions] = useState<SafeUser | null>(null);
  const [activeSessions, setActiveSessions] = useState<UserSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getAdminUsers();
      setUsers(res as SafeUser[]);
    } catch {
      toast.error("Failed to fetch administrative users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.reason.trim().length < 10) {
      toast.error("Mandatory reason must be at least 10 characters.");
      return;
    }
    setProcessing(true);
    try {
      const res = await createAdminUser({
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          reason: formData.reason.trim(),
        },
      });

      toast.success(`Administrator ${res.email} created successfully.`);
      setShowCreateModal(false);
      setFormData({ name: "", email: "", password: "", role: "EDITOR", reason: "" });
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create user.");
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenEdit = (u: SafeUser) => {
    setEditUser(u);
    setEditFormData({
      name: u.name,
      role: u.role as "SUPER_ADMIN" | "EDITOR",
      isActive: u.isActive,
      newPassword: "",
      reason: "",
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    if (editFormData.reason.trim().length < 10) {
      toast.error("Mandatory justification reason must be at least 10 characters.");
      return;
    }
    setProcessing(true);
    try {
      await updateAdminUser({
        data: {
          id: editUser.id,
          name: editFormData.name,
          role: editFormData.role,
          isActive: editFormData.isActive,
          password: editFormData.newPassword || undefined,
          reason: editFormData.reason.trim(),
        },
      });

      toast.success(`User #${editUser.id} updated successfully.`);
      setShowEditModal(false);
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update user.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (u: SafeUser) => {
    if (u.id === currentUser?.id) {
      toast.error("You cannot delete your own active administrator account.");
      return;
    }

    const reason = window.prompt(
      `Enter mandatory audit justification for deleting administrator "${u.name}" (${u.email}) [min 10 chars]:`,
    );

    if (!reason || reason.trim().length < 10) {
      toast.error("Deletion cancelled: A reason of at least 10 characters is mandatory.");
      return;
    }

    try {
      await deleteAdminUser({ data: { id: u.id, reason: reason.trim() } });
      toast.success(`User ${u.email} permanently removed.`);
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete user.");
    }
  };

  const handleViewSessions = async (u: SafeUser) => {
    setSelectedUserForSessions(u);
    setShowSessionsModal(true);
    setLoadingSessions(true);
    try {
      const sessions = await getUserSessions({ data: { userId: u.id } });
      setActiveSessions(sessions);
    } catch {
      toast.error("Failed to load active sessions.");
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleRevokeSession = async (sessionId: number) => {
    try {
      await revokeUserSession({
        data: {
          sessionId,
          reason: `Session #${sessionId} revoked by Super Admin ${currentUser?.email} via User Management CRM`,
        },
      });
      toast.success(`Session #${sessionId} revoked with 0ms delay.`);
      if (selectedUserForSessions) {
        const sessions = await getUserSessions({ data: { userId: selectedUserForSessions.id } });
        setActiveSessions(sessions);
      }
    } catch {
      toast.error("Failed to revoke session.");
    }
  };

  // RBAC Permission Check: Super Admin only
  if (currentUser && currentUser.role !== "SUPER_ADMIN") {
    return (
      <AdminShell>
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-3xl mx-auto grid place-items-center border border-rose-200 shadow-sm">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Module 14: User & Role Management requires elevated <strong>SUPER_ADMIN</strong>{" "}
            statutory privileges. Please contact the Secretariat Executive Administrator.
          </p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                Module 14
              </span>
              <span className="text-xs font-mono text-slate-400">Database RBAC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              User & Role Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage sovereign administrators, assigned roles, progressive account lockouts, and
              instant session revocation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchUsers}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
              title="Refresh Users"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Create Administrator</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">
                Querying sovereign user directory...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No administrative users found</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-6">User & Identity</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Security Status</th>
                    <th className="py-3.5 px-4">Created Date</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => {
                    const isLocked = u.lockedUntil && new Date(u.lockedUntil) > new Date();
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                          <div className="text-slate-500 font-mono text-[11px]">{u.email}</div>
                          {u.id === currentUser?.id && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                              Current Logged-in Account
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              u.role === "SUPER_ADMIN"
                                ? "bg-purple-50 text-purple-800 border border-purple-200"
                                : "bg-blue-50 text-blue-800 border border-blue-200"
                            }`}
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {u.role}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          {u.isActive ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <UserCheck className="h-4 w-4" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                              <UserX className="h-4 w-4" /> Deactivated
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          {isLocked ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[10px]">
                              <Lock className="h-3 w-3" /> Account Locked
                            </span>
                          ) : u.failedAttempts > 0 ? (
                            <span className="text-amber-700 font-mono font-bold text-[11px]">
                              {u.failedAttempts} failed attempt(s)
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Clean
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 font-mono text-slate-500 text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleViewSessions(u)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                              title="View and revoke active sessions"
                            >
                              <Activity className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Sessions</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEdit(u)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                              title="Edit user parameters"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>

                            {u.id !== currentUser?.id && (
                              <button
                                type="button"
                                onClick={() => handleDelete(u)}
                                className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                title="Delete user"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: Create User */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center">
                    <Plus className="h-4 w-4" />
                  </div>
                  <h3 className="font-black text-lg text-slate-900">Create Administrator</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tshering Penjor"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Official Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@bhtf.bt"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Temporary Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Minimum 8 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Assigned Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as "SUPER_ADMIN" | "EDITOR" })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none font-bold"
                  >
                    <option value="EDITOR">EDITOR (Content Management Only)</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Full Site & Fiduciary Control)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Mandatory Audit Justification (Min 10 chars)
                  </label>
                  <textarea
                    rows={2}
                    required
                    minLength={10}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="State the official rationale for creating this administrator..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">
                    Characters: {formData.reason.length} / 10 required
                  </span>
                </div>

                <div className="pt-4 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>Create User</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit User */}
        {showEditModal && editUser && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-black text-lg text-slate-900">Edit User #{editUser.id}</h3>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Assigned Role</label>
                  <select
                    value={editFormData.role}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        role: e.target.value as "SUPER_ADMIN" | "EDITOR",
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none font-bold"
                  >
                    <option value="EDITOR">EDITOR</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Reset Password (Optional)
                  </label>
                  <input
                    type="password"
                    minLength={8}
                    value={editFormData.newPassword}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, newPassword: e.target.value })
                    }
                    placeholder="Leave blank to preserve existing password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">
                    Changing password automatically revokes all existing active sessions.
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActiveCheck"
                    checked={editFormData.isActive}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, isActive: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="isActiveCheck"
                    className="text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    Account Active (Uncheck to immediately deactivate)
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Mandatory Audit Justification (Min 10 chars)
                  </label>
                  <textarea
                    rows={2}
                    required
                    minLength={10}
                    value={editFormData.reason}
                    onChange={(e) => setEditFormData({ ...editFormData, reason: e.target.value })}
                    placeholder="State the official rationale for modifying this user account..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">
                    Characters: {editFormData.reason.length} / 10 required
                  </span>
                </div>

                <div className="pt-4 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Active Sessions & Instant Revocation */}
        {showSessionsModal && selectedUserForSessions && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    Active Sessions: {selectedUserForSessions.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {selectedUserForSessions.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSessionsModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {loadingSessions ? (
                <div className="py-12 text-center space-y-2">
                  <Loader2 className="h-6 w-6 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-bold">
                    Querying user_sessions table...
                  </p>
                </div>
              ) : activeSessions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="font-bold text-slate-800 text-xs">No active sessions</p>
                  <p className="text-[11px] text-slate-500">
                    User currently has zero unexpired active sessions in PostgreSQL.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {activeSessions.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <Laptop className="h-4 w-4 text-slate-500" />
                          <span>Session #{s.id}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                            Active
                          </span>
                        </div>
                        <div className="text-slate-500 text-[11px] font-mono">
                          IP: {s.ipAddress || "Unknown"} • User-Agent:{" "}
                          {s.userAgent || "Standard Browser"}
                        </div>
                        <div className="text-slate-400 text-[10px] flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Expires: {new Date(s.expiresAt).toLocaleString("en-US")}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRevokeSession(s.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition border border-rose-200 cursor-pointer shrink-0"
                      >
                        Revoke Now
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSessionsModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
