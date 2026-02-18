import React, { useEffect, useState } from 'react';
import { Search, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { api } from '../../services/api';
import { User, UserRole } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const data = await api.users.list();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.users.delete(id);
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };
  const handleRoleChange = async (id: string, newRole: UserRole) => {
    try {
      await api.users.updateRole(id, newRole);
      setUsers(
        users.map((u) =>
        u.id === id ?
        {
          ...u,
          role: newRole
        } :
        u
        )
      );
    } catch (error) {
      console.error('Failed to update role', error);
    }
  };
  const filteredUsers = users.filter(
    (user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Users</h1>
          <p className="text-slate-400">
            View and manage all registered users.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      </div>

      {isLoading ?
      <div className="space-y-4">
          {[1, 2, 3].map((i) =>
        <div
          key={i}
          className="h-20 bg-white/5 rounded-xl animate-pulse">
        </div>
        )}
        </div> :

      <div className="grid gap-4">
          {filteredUsers.map((user) =>
        <Card
          key={user.id}
          className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
              src={user.avatar}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover border-2 border-white/10" />

                <div>
                  <h3 className="text-white font-medium">{user.name}</h3>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <select
                value={user.role}
                onChange={(e) =>
                handleRoleChange(user.id, e.target.value as UserRole)
                }
                className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2">

                    <option value="admin">Admin</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                </div>

                <div className="text-sm text-slate-500 hidden md:block">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>

                <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(user.id)}
              title="Delete User">

                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
        )}

          {filteredUsers.length === 0 &&
        <div className="text-center py-12 text-slate-500">
              No users found matching your search.
            </div>
        }
        </div>
      }
    </div>);

}