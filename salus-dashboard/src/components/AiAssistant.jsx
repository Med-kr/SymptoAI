import { useState } from "react";
import api from "../api/api";

export default function AiAssistant() {

  const [advice, setAdvice] = useState("");

  const generateAdvice = async () => {
    const res = await api.post("/ai-advice");

    setAdvice(res.data.data.advice);
  };

  return (
    <div>
      <h2>AI Assistant</h2>

      <button onClick={generateAdvice}>
        Generate Advice
      </button>

      <p>{advice}</p>

    </div>
  );
}