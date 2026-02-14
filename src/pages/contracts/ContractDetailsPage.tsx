import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContracts } from "../../context/ContractsContext";

export default function ContractDetailsPage() {
    const { contractId } = useParams();
    const { user } = useAuth();
    const { getContractById } = useContracts();

    if (!user) {
        return <div className="p-6">Please login to view contract details.</div>;
      }

      if (!contractId) {
        return <div className="p-6">Invalid contract</div>;
      }

      const contract = getContractById(contractId);

  if (!contract) {
    return <div className="p-6">Contract not found</div>;
  }

  const allowed = contract.clientId === user.id || contract.freelancerId === user.id;


  if (!allowed) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white border rounded-xl p-6 space-y-3">
          <h1 className="text-xl font-bold">Access denied</h1>
          <p className="text-gray-600">You don’t have permission to view this contract.</p>
          <Link
            to="/contracts"
            className="inline-flex px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-sm"
          >
            ← Back to Contracts
          </Link>
        </div>
      </div>
    );
  }

}  