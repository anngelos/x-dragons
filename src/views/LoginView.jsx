import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginView.css";

function LoginView() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUser = "targaryen";
    const validPassword = "valiria";

    if (emailValue === validUser && passwordValue === validPassword) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>X-Dragons</h2>
          <p>Entre com suas credenciais para acessar sua conta</p>
        </div>

        <form className="login-form" id="loginForm" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                id="email"
                name="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className={emailValue ? "has-value" : ""}
              />
              <label htmlFor="email">Usuário</label>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper password-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className={passwordValue ? "has-value" : ""}
              />
              <label htmlFor="password">Senha</label>
            </div>
          </div>

          {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}

          <button type="submit" className="login-btn">
            <span className="btn-text">Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
