import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllAssociates } from "../api/associatesApi";

export default function AssociateView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [associate, setAssociate] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllAssociates();
      const found = data.find((a) => a.id === parseInt(id));
      setAssociate(found);
    };
    load();
  }, [id]);

  if (!associate) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Associate Details</h2>
      <p><strong>ID:</strong> {associate.id}</p>
      <p><strong>Name:</strong> {associate.name}</p>
      <p><strong>Department:</strong> {associate.dept}</p>
      <p><strong>Salary:</strong> {associate.salary}</p>
      <p><strong>Manager:</strong> {associate.managerName || "N/A"}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/edit/${associate.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}
