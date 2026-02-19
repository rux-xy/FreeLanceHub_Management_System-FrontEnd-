import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button, Input } from '../../components/ui/FormControls';
import { RoleBadge } from '../../components/ui/Badges';
import { useAuth } from '../../state/auth';
import { Search, Trash2, AlertCircle } from 'lucide-react';
import type { SafeUser, UserRole } from '../../types';

export function Users() {
  const { getAllUsers, updateUserRole, deleteUser, user: currentUser } = useAuth();

  const [users, setUsers] = useState<SafeUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Track per-row loading states
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to load users.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: UserRole) => {
    setUpdatingRole(userId);
    setError(null);
    try {
      await updateUserRole(userId, role);
      // Optimistically update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u)),
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to update role.',
      );
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (userId === currentUser?.id) return; // Can't delete self
    if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    setDeletingUser(userId);
    setError(null);
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to delete user.',
      );
    } finally {
      setDeletingUser(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">User Management</h1>

      {/* Search bar */}
      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2 mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500" />
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Name', 'Email', 'Current Role', 'Change Role', 'Joined', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => {
                  const isSelf = u.id === currentUser?.id;
                  const isUpdating = updatingRole === u.id;
                  const isDeleting = deletingUser === u.id;

                  return (
                    <tr
                      key={u.id}
                      className="border-b border-gray-800/50 hover:bg-[#1f2937]/30 transition-colors"
                    >
                      {/* Name */}
                      <td className="p-4 text-white font-medium">
                        {u.name}
                        {isSelf && (
                          <span className="ml-2 text-xs text-teal-400">(you)</span>
                        )}
                      </td>

                      {/* Email */}
                      <td className="p-4 text-gray-400 text-sm">{u.email}</td>

                      {/* Current Role badge */}
                      <td className="p-4">
                        <RoleBadge role={u.role} />
                      </td>

                      {/* Role change dropdown */}
                      <td className="p-4">
                        <select
                          value={u.role}
                          disabled={isSelf || isUpdating}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value as UserRole)
                          }
                          className="bg-[#111827] border border-gray-700 text-gray-100 rounded px-2 py-1 text-sm
                                     focus:outline-none focus:ring-1 focus:ring-teal-500
                                     disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {/* UPPERCASE values — what the backend expects */}
                          <option value="CLIENT">Client</option>
                          <option value="FREELANCER">Freelancer</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                        {isUpdating && (
                          <span className="ml-2 text-xs text-teal-400 animate-pulse">
                            Saving…
                          </span>
                        )}
                      </td>

                      {/* Joined date */}
                      <td className="p-4 text-gray-500 text-sm">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : '—'}
                      </td>

                      {/* Delete */}
                      <td className="p-4 text-right">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(u.id)}
                          disabled={isSelf || isDeleting}
                          title={isSelf ? "Can't delete your own account" : 'Delete user'}
                          isLoading={isDeleting}
                        >
                          {!isDeleting && <Trash2 className="w-3 h-3" />}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              {search ? 'No users match your search.' : 'No users found.'}
            </div>
          )}
        </Card>
      )}
    </Layout>
  );
}
