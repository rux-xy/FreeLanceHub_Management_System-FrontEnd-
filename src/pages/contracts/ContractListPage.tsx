import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useContracts } from "../../context/ContractsContext";
import { Link } from "react-router-dom";

export default function ContractListPage() {
  const { user } = useAuth();
  const { getContractsByUser } = useContracts();

  const contracts = useMemo(() => {
    if (!user) return [];
    return getContractsByUser(user.id);
  }, [user, getContractsByUser]);

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white border rounded-xl p-6">
          <h1 className="text-xl font-bold mb-2">Contracts</h1>
          <p className="text-gray-600">Please login to view contracts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold">Your Contracts</h1>

        {contracts.length === 0 ? (
          <div className="bg-gray-50 border rounded-lg p-4 text-gray-700">
            No contracts yet.
          </div>
        ) : (
          <div className="space-y-4">
            {contracts.map((c) => (
              <div key={c.id} className="border rounded-xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-lg">{c.title}</p>
                    <p className="text-sm text-gray-600">
                      Total: <span className="font-medium">${c.totalAmount}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="font-medium">{c.status}</span>
                    </p>
                  </div>

                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-700">{c.description}</p>

                <Link
                  to={`/contracts/${c.id}`}
                  className="inline-flex text-sm font-semibold px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
