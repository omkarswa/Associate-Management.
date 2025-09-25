const API_BASE = "http://localhost:8080/associates";

export async function fetchAllAssociates() {
  const res = await fetch(`${API_BASE}/read`);
  return res.json();
}

export async function searchAssociates(query) {
  const res = await fetch(
    `${API_BASE}/search?name=${query}&dept=${query}&managerName=${query}`
  );
  return res.json();
}

export async function addAssociate(payload) {
  return fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function editAssociate(id, payload) {
  return fetch(`${API_BASE}/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteAssociate(id) {
  return fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });
}
