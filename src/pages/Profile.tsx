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

}