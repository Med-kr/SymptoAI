import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthShell from "../components/AuthShell";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.email?.[0] ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Connexion securisee"
      title="Retrouvez votre espace medical intelligent."
      subtitle="Connectez-vous a SymptoAI pour suivre vos informations avec une interface claire, moderne et fortement inspiree de votre identite visuelle."
      alternateLabel="Pas encore de compte ?"
      alternateLink="/register"
      alternateText="Creer un compte"
      accent="blue"
    >
      <div className="auth-card">
        <div className="auth-copy">
          <p className="auth-kicker">Bon retour</p>
          <h2 className="auth-title">Connexion</h2>
          <p className="auth-description">
            Entrez vos informations pour acceder a votre tableau de bord.
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-field">
            <span className="auth-label">Adresse email</span>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="nom@exemple.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Mot de passe</span>
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="auth-button login-btn"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
