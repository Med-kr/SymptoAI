import { useEffect, useState } from "react";
import { getDoctors, searchDoctors } from "../services/doctorService";
import DoctorCard from "../components/DoctorCard";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  //  Load all doctors
  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  //  Handle search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      const res = await getDoctors();
      setDoctors(res.data);
    } else {
      const res = await searchDoctors(value);
      setDoctors(res.data);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des médecins</h1>

      {/*  Search */}
      <input
        type="text"
        placeholder="Rechercher par ville ou spécialité..."
        value={search}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />

      {/*  List */}
      {doctors.length > 0 ? (
        doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)
      ) : (
        <p>Aucun médecin trouvé</p>
      )}
    </div>
  );
}