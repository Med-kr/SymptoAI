import { useState } from "react";
import { createAppointment } from "../../services/appointments";

const CreateAppointment = () => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    doctor_id: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAppointment(form);
    alert("Appointment created!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-xl font-bold mb-4">New Appointment</h1>

      <input name="date" onChange={handleChange} placeholder="Date"
        className="block border p-2 mb-2 w-full" />

      <input name="time" onChange={handleChange} placeholder="Time"
        className="block border p-2 mb-2 w-full" />

      <input name="doctor_id" onChange={handleChange} placeholder="Doctor ID"
        className="block border p-2 mb-2 w-full" />

      <input name="reason" onChange={handleChange} placeholder="Reason"
        className="block border p-2 mb-2 w-full" />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
};

export default CreateAppointment;