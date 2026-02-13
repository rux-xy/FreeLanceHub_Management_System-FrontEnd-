import { useAuth } from '../hooks/useAuth';

export default function Profile() {

  const { user, logout } = useAuth();

  const initials = (() => {
    if (!user?.name) return 'U';
    const parts = user.name.trim().split(' ');
    const first = parts[0]?.[0] ?? 'U';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  })();
  

  if (!user) {
    // This shouldn't happen because the route is protected, but keeping it makes the component safer.
    return (
      <div className="rounded-lg border bg-white p-6">
        <p className="text-gray-700">No user data available.</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-xl border bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {initials}
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Role</p>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {user.role}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-xs text-gray-500 mb-1">Created At</p>
              <p className="text-sm text-gray-800">{user.createdAt}</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-gray-500 mb-1">Updated At</p>
              <p className="text-sm text-gray-800">{user.updatedAt}</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs text-gray-500 mb-2">Bio</p>
            <p className="text-sm text-gray-700">
              {user.bio?.trim() ? user.bio : 'No bio added yet.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );



}