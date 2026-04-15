import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorById } from "../assets/services/doctorsService";
export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    getDoctorById(id)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{doctor.name}</h1>

      <p> Spécialité: {doctor.specialty}</p>
      <p> Ville: {doctor.city}</p>
      <p> Expérience: {doctor.yearsofexperience} ans</p>
      <p> Prix: {doctor.consultation_price} DH</p>
      <p> Jours disponibles: {doctor.available_days}</p>
    </div>
  );
}