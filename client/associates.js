const apiBase = "http://localhost:8080/associates";

const tableBody = document.querySelector("#associatesTable tbody");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const showAllBtn = document.getElementById("showAllBtn");
const totalCountSpan = document.getElementById("totalCount");

const associateIdInput = document.getElementById("associateId");
const nameInput = document.getElementById("nameInput");
const deptInput = document.getElementById("deptInput");
const salaryInput = document.getElementById("salaryInput");
const managerIdInput = document.getElementById("managerIdInput");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");

// --- Render Table ---
function renderTable(data) {
    tableBody.innerHTML = "";
    if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="6" style="text-align:center;">No data found</td>`;
        tableBody.appendChild(row);
        return;
    }
    data.forEach(a => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${a.id}</td>
            <td>${a.name}</td>
            <td>${a.dept}</td>
            <td>${a.salary}</td>
            <td>${a.managerName || ""}</td>
            <td>
                <button class="action-btn view-btn" onclick="viewAssociate(${a.id})">View</button>
                <button class="action-btn edit-btn" onclick="editAssociate(${a.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteAssociate(${a.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// --- Fetch All ---
async function fetchAll() {
    try {
        const res = await fetch(`${apiBase}/read`);
        const data = await res.json();
        renderTable(data);
        updateCount(data.length);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

// --- Update Count ---
function updateCount(count) {
    totalCountSpan.textContent = `Total: ${count}`;
}

// --- Search ---
async function searchAssociates() {
    const query = searchInput.value.trim();
    if (!query) {
        fetchAll();
        return;
    }
    try {
        // Pass query to all relevant fields: name, dept, managerName
        const res = await fetch(`${apiBase}/search?name=${encodeURIComponent(query)}&dept=${encodeURIComponent(query)}&managerName=${encodeURIComponent(query)}`);
        const data = await res.json();
        renderTable(data);
        totalCountSpan.textContent = `Total: ${data.length}`;
    } catch (err) {
        console.error("Error searching:", err);
    }
}

// --- Add / Edit ---
async function submitForm() {
    const id = associateIdInput.value;
    const payload = {
        name: nameInput.value,
        dept: deptInput.value,
        salary: parseFloat(salaryInput.value),
        managerId: managerIdInput.value ? parseInt(managerIdInput.value) : null
    };

    try {
        if (id) {
            // Edit
            await fetch(`${apiBase}/edit/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            // Add
            await fetch(`${apiBase}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
        resetForm();
        fetchAll();
    } catch (err) {
        console.error("Error submitting form:", err);
    }
}

// --- Edit ---
async function editAssociate(id) {
    try {
        const res = await fetch(`${apiBase}/read`);
        const data = await res.json();
        const associate = data.find(a => a.id === id);
        if (associate) {
            associateIdInput.value = associate.id;
            nameInput.value = associate.name;
            deptInput.value = associate.dept;
            salaryInput.value = associate.salary;
            managerIdInput.value = associate.managerId || "";
            formTitle.textContent = "Edit Associate";
        }
    } catch (err) {
        console.error(err);
    }
}

// --- Delete ---
async function deleteAssociate(id) {
    if (!confirm("Are you sure to delete this associate?")) return;
    try {
        await fetch(`${apiBase}/delete/${id}`, {
            method: 'DELETE'
        });
        fetchAll();
    } catch (err) {
        console.error("Error deleting:", err);
    }
}

// --- View ---
async function viewAssociate(id) {
    try {
        const res = await fetch(`${apiBase}/read`);
        const data = await res.json();
        const associate = data.find(a => a.id === id);
        if (associate) {
            alert(`ID: ${associate.id}\nName: ${associate.name}\nDepartment: ${associate.dept}\nSalary: ${associate.salary}\nManager: ${associate.managerName || "N/A"}`);
        }
    } catch (err) {
        console.error(err);
    }
}

// --- Reset Form ---
function resetForm() {
    associateIdInput.value = "";
    nameInput.value = "";
    deptInput.value = "";
    salaryInput.value = "";
    managerIdInput.value = "";
    formTitle.textContent = "Add New Associate";
}

// --- Event Listeners ---
searchBtn.addEventListener("click", searchAssociates);
showAllBtn.addEventListener("click", () => {
    searchInput.value = "";
    fetchAll();
});
submitBtn.addEventListener("click", submitForm);
cancelBtn.addEventListener("click", resetForm);

// --- Initial Fetch ---
fetchAll();