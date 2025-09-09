import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;