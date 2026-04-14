import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;