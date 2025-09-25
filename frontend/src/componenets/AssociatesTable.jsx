import AssociateRow from "./AssociateRow";

export default function AssociatesTable({ associates, onDelete }) {
  if (!associates.length) {
    return (
      <p className="text-center mt-6 text-gray-500 italic">
        🚫 No data found
      </p>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-3 border-b">ID</th>
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Dept</th>
            <th className="px-4 py-3 border-b text-right">Salary</th>
            <th className="px-4 py-3 border-b">Manager</th>
            <th className="px-4 py-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {associates.map((a, index) => (
            <AssociateRow key={a.id} associate={a} onDelete={onDelete} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
