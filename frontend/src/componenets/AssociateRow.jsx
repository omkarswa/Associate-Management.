import { useNavigate } from "react-router-dom";

export default function AssociateRow({ associate, onDelete, index }) {
  const navigate = useNavigate();

  return (
    <tr
      className={`hover:bg-gray-50 transition ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      <td className="px-4 py-3">{associate.id}</td>
      <td className="px-4 py-3 font-medium text-gray-800">{associate.name}</td>
      <td className="px-4 py-3">{associate.dept}</td>
      <td className="px-4 py-3 text-right">₹{associate.salary}</td>
      <td className="px-4 py-3">{associate.managerName || "—"}</td>
      <td className="px-4 py-3 text-center space-x-2">
        <button
          onClick={() => navigate(`/view/${associate.id}`)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          View
        </button>
        <button
          onClick={() => navigate(`/edit/${associate.id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(associate.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
