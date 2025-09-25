import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssociatesList from "./pages/AssociatesList";
import AssociateForm from "./pages/AssociateForm";
import AssociateView from "./pages/AssociateView";

export default function App() {
  return (
    <Router>
      <div className="max-w-5xl mx-auto p-6">
        <Routes>
          {/* List all associates */}
          <Route path="/" element={<AssociatesList />} />

          {/* Add new associate */}
          <Route path="/add" element={<AssociateForm />} />

          {/* Edit associate by ID */}
          <Route path="/edit/:id" element={<AssociateForm />} />

          {/* View associate details */}
          <Route path="/view/:id" element={<AssociateView />} />
        </Routes>
      </div>
    </Router>
  );
}
