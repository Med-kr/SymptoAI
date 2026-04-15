import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {

  const [symptoms, setSymptoms] = useState([]);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/symptoms")
      .then(res => {
        setSymptoms(res.data.data.symptoms);
      });
  }, []);

  const getAdvice = async () => {
    setLoading(true);

    try {
      const res = await api.post("/ai-advice");
      setAdvice(res.data.data.advice);
    } catch (e) {
      setAdvice("Failed to generate advice");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>AI Health Dashboard</h1>

      {/* AI Button */}
      <button style={styles.button} onClick={getAdvice}>
        {loading ? "Analyzing..." : "Generate AI Advice"}
      </button>

      {/* AI Result */}
      {advice && (
        <div style={styles.adviceBox}>
          <h2>AI Advice</h2>
          <p>{advice}</p>
        </div>
      )}

      {/* Symptoms */}
      <div style={styles.card}>
        <h2>Your Symptoms</h2>

        {symptoms.map(symptom => (
          <div key={symptom.id} style={styles.symptom}>
            <h3>{symptom.name}</h3>
            <p>Severity: {symptom.severity}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0b0b0b",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    fontFamily: "sans-serif"
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px"
  },

  button: {
    backgroundColor: "#111",
    color: "white",
    border: "1px solid #333",
    padding: "12px 20px",
    cursor: "pointer",
    marginBottom: "20px"
  },

  card: {
    backgroundColor: "#111",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px"
  },

  symptom: {
    borderBottom: "1px solid #222",
    padding: "10px 0"
  },

  adviceBox: {
    backgroundColor: "#050505",
    border: "1px solid #222",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px"
  }
};