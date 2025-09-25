import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAssociate,
  editAssociate,
  fetchAllAssociates,
} from "../api/associatesApi";

export default function AssociateForm() {
  const { id } = useParams(); // id exists if editing
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dept: "",
    salary: "",
    managerId: "",
  });

  // Load existing data if editing
  useEffect(() => {
    if (!id) return;
    const loadAssociate = async () => {
      const data = await fetchAllAssociates();
      const associate = data.find((a) => a.id === parseInt(id));
      if (associate) {
        setForm({
          name: associate.name,
          dept: associate.dept,
          salary: associate.salary,
          managerId: associate.managerId || "",
        });
      }
    };
    loadAssociate();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      dept: form.dept,
      salary: parseFloat(form.salary),
      managerId: form.managerId ? parseInt(form.managerId) : null,
    };

    if (id) {
      await editAssociate(id, payload);
    } else {
      await addAssociate(payload);
    }

    navigate("/"); // go back to list after save
  };

  // Cancel button
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Associate" : "Add Associate"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="dept"
          placeholder="Department"
          value={form.dept}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="managerId"
          placeholder="Manager ID (optional)"
          value={form.managerId}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
