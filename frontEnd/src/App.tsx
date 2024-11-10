import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import { DoctorDashboard, PatientDashboard } from "./pages/Dashboard";
import {
  AppointmentDetails,
  AppointmentBooking,
  HospitalDirectory,
  DoctorDirectory,
} from "./pages/AdditionalPages";
import { Reviews } from "./pages/Reviews";
import { useParams, Navigate } from "react-router-dom";
// New ReviewPage component to handle review routing
const ReviewPage = () => {
  const { entityId } = useParams();

  if (!entityId) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Reviews entityId={entityId} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/register" element={<AuthenticationPage />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/appointmentBooking" element={<AppointmentBooking />} />
        <Route path="/appointmentDetails" element={<AppointmentDetails />} />
        <Route path="/hospitalDirectory" element={<HospitalDirectory />} />
        <Route path="/doctorDirectory" element={<DoctorDirectory />} />

        {/* Review Routes */}
        <Route path="/reviews/:entityId" element={<ReviewPage />} />

        {/* Optional: Dedicated routes for doctors and hospitals */}
        <Route path="/doctor/:id/reviews" element={<ReviewPage />} />
        <Route path="/hospital/:id/reviews" element={<ReviewPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
