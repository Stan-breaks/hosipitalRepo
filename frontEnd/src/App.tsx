// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthenticationPage from "./pages/AuthenticationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/register" element={<AuthenticationPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
