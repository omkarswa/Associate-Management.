export default function SearchBar({ query, setQuery, onSearch, onShowAll, total }) {
  return (
    <div className="flex gap-2 mb-4 items-center">
      <input
        type="text"
        className="border rounded p-2 flex-1"
        placeholder="Search by name, dept, manager, salary"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
      <button
        onClick={onShowAll}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Show All
      </button>
      <span>Total: {total}</span>
    </div>
  );
}
