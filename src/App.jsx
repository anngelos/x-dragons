import { useState } from "react";
import "./App.css";

function App() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>X-Dragons</h2>
          <p>Entre com suas credenciais para acessar sua conta</p>
        </div>

        <form className="login-form" id="loginForm" noValidate>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
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

          <button type="submit" className="login-btn">
            <span className="btn-text">Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
