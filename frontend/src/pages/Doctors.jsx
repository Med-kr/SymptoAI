import { useEffect, useState } from "react";
import { getDoctors, searchDoctors } from "../assets/services/doctorsService";

const DoctorCard = ({ doc }) => {
  const [hover, setHover] = useState(false);

  const cardStyle = {
    background: "#fff",
    padding: "24px",
    borderRadius: "20px",
    border: hover ? "1px solid #3b82f6" : "1px solid #f1f5f9",
    boxShadow: hover ? "0 10px 25px rgba(0,0,0,0.1)" : "0 4px 6px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
    transform: hover ? "translateY(-5px)" : "translateY(0)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const btnStyle = {
    textDecoration: "none",
    color: hover ? "#fff" : "#3b82f6",
    background: hover ? "#3b82f6" : "#eff6ff",
    padding: "10px 15px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "0.3s"
  };

  return (
    <div 
      style={cardStyle} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <div style={{ fontSize: "2rem", marginBottom: "15px" }}>medecin:</div>
        <h3 style={{ margin: "0 0 8px 0", color: "#1e293b", fontSize: "1.2rem" }}>{doc.name}</h3>
        <p style={{ color: "#3b82f6", fontWeight: "500", fontSize: "0.9rem", margin: "0 0 12px 0" }}>
          {doc.specialite.toUpperCase()}
        </p>
        <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "5px" }}>--</span> {doc.ville}
        </p>
      </div>
      <a href={`/doctors/${doc.id}`} style={btnStyle}>
        Voir le profil
      </a>
    </div>
  );
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    try {
      const res = value === "" ? await getDoctors() : await searchDoctors(value);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ 
      padding: "40px 20px", 
      fontFamily: "'Inter', sans-serif", 
      background: "#f8fafc", 
      minHeight: "100vh" 
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>
            Nos Praticiens
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
            Prenez rendez-vous avec un spécialiste en quelques clics.
          </p>
        </header>

        <div style={{ position: "relative", marginBottom: "40px" }}>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Rechercher par ville, spécialité..."
            style={{
              padding: "16px 20px 16px 50px",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "15px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              outline: "none",
              transition: "0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
          />
       
        </div>

        {doctors.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <p style={{ color: "#94a3b8", fontSize: "1.2rem" }}>Aucun médecin trouvé</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px"
          }}>
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}