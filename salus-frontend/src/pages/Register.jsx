import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthShell from "../components/AuthShell";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.email?.[0] ||
          "Register failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Inscription immersive"
      title="Creez un compte dans un univers visuel fort et memorisable."
      subtitle="Le logo SymptoAI devient la piece centrale de la page pour installer une premiere impression premium, medicale et technologique."
      alternateLabel="Vous avez deja un compte ?"
      alternateLink="/login"
      alternateText="Se connecter"
      accent="green"
    >
      <div className="auth-card">
        <div className="auth-copy">
          <p className="auth-kicker">Nouvelle experience</p>
          <h2 className="auth-title">Inscription</h2>
          <p className="auth-description">
            Creez votre compte pour commencer votre parcours sur SymptoAI.
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-field">
            <span className="auth-label">Nom complet</span>
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

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
              placeholder="Choisissez un mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Confirmation</span>
            <input
              className="auth-input"
              type="password"
              name="password_confirmation"
              placeholder="Confirmez votre mot de passe"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="auth-button register-btn"
          >
            {loading ? "Creation..." : "Creer mon compte"}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
