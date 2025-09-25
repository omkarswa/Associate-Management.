import { useEffect, useState } from "react";
import SearchBar from "../componenets/SearchBar";
import AssociatesTable from "../componenets/AssociatesTable";
import {
  fetchAllAssociates,
  searchAssociates,
  deleteAssociate,
} from "../api/associatesApi";

export default function AssociatesList() {
  const [associates, setAssociates] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const data = await fetchAllAssociates();
    setAssociates(data);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      fetchAll();
    } else {
      const data = await searchAssociates(query);
      setAssociates(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteAssociate(id);
      fetchAll();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">Associate Management</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onShowAll={fetchAll}
        total={associates.length}
      />

      <AssociatesTable associates={associates} onDelete={handleDelete} />
    </div>
  );
}
