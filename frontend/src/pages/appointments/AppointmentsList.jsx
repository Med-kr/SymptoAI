import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../../services/appointments";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await getAppointments();
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      {appointments.map((app) => (
        <div key={app.id} className="bg-white p-4 mb-3 shadow rounded">
          <p><b>Date:</b> {app.date}</p>
          <p><b>Reason:</b> {app.reason}</p>

          <button
            onClick={() => handleDelete(app.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;