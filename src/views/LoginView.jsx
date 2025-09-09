import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginView.module.css";

function LoginView() {
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUser = "targaryen";
    const validPassword = "valiria";

    if (userValue === validUser && passwordValue === validPassword) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2>X-Dragons</h2>
          <p>Entre com suas credenciais para acessar sua conta</p>
        </div>

        <form className={styles.loginForm} id="loginForm" noValidate onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="text"
                name="text"
                value={userValue}
                onChange={(e) => setUserValue(e.target.value)}
                className={userValue ? "has-value" : ""}
              />
              <label htmlFor="text">Usuário</label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
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

          <button type="submit" className={styles.loginBtn}>
            <span className={styles.btnText}>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
