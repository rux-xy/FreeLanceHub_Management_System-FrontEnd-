import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {

  const { user, logout } = useAuth();

  const initials = useMemo(() => {
    if (!user?.name) return 'U';
    const parts = user.name.trim().split(' ');
    const first = parts[0]?.[0] ?? 'U';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  }, [user?.name]);

  if (!user) {
    // This shouldn't happen because the route is protected,
    // but keeping it makes the component safer.
    return (
      <div className="rounded-lg border bg-white p-6">
        <p className="text-gray-700">No user data available.</p>
      </div>
    );
  }

}