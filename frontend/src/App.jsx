import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentsList from "./pages/appointments/AppointmentsList";
import CreateAppointment from "./pages/appointments/CreateAppointment";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LIST */}
        <Route path="/appointments" element={<AppointmentsList />} />

        {/* CREATE */}
        <Route path="/appointments/create" element={<CreateAppointment />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;