import { Link } from "react-router-dom";
import logo from "../assets/symptoai-logo.png";

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  alternateLabel,
  alternateLink,
  alternateText,
  accent = "blue",
  children,
}) {
  return (
    <div className={`auth-page auth-page--${accent}`}>
      <div className="auth-ambient auth-ambient--left" />
      <div className="auth-ambient auth-ambient--right" />

      <section className="auth-showcase">
        <div className="auth-showcase__badge">
          <span className="auth-showcase__badge-dot" />
          Intelligence sante augmentee
        </div>

        <div className="auth-logo-frame">
          <div className="auth-logo-orbit auth-logo-orbit--blue" />
          <div className="auth-logo-orbit auth-logo-orbit--green" />
          <img
            className="auth-logo"
            src={logo}
            alt="SymptoAI"
          />
        </div>

        <div className="auth-showcase__content">
          <p className="auth-showcase__eyebrow">{eyebrow}</p>
          <h1 className="auth-showcase__title">{title}</h1>
          <p className="auth-showcase__subtitle">{subtitle}</p>
        </div>

        <div className="auth-showcase__metrics">
          <div className="auth-metric">
            <strong>Vision claire</strong>
            <span>Une interface medicale futuriste, lisible et rassurante.</span>
          </div>
          <div className="auth-metric">
            <strong>ADN du logo</strong>
            <span>Bleu profond, glow cyan et vert energique alignes a SymptoAI.</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__header">
          <img
            className="auth-panel__logo"
            src={logo}
            alt="SymptoAI"
          />
          <div>
            <p className="auth-panel__brand">SymptoAI</p>
            <p className="auth-panel__tag">Votre acces a une experience sante intelligente</p>
          </div>
        </div>

        {children}

        <p className="auth-footer">
          {alternateLabel}{" "}
          <Link to={alternateLink} className="auth-link">
            {alternateText}
          </Link>
        </p>
      </section>
    </div>
  );
}
