import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <div className="border p-4 rounded shadow mb-3">
      <h2 className="text-lg font-bold">{doctor.name}</h2>
      <p> {doctor.specialty}</p>
      <p> {doctor.city}</p>
      <p> {doctor.consultation_price} DH</p>

      <Link
        to={`/doctors/${doctor.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        Voir détail
      </Link>
    </div>
  );
}