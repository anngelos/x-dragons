import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../styles/LoginView.module.css";

function LoginView() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const validUser = "targaryen";
    const validPassword = "valiria";

    if (data.user !== validUser || data.password !== validPassword) {
      setError("root", {
        type: "manual",
        message: "Usuário ou senha incorretos!",
      });
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2>X-Dragons</h2>
          <p>Entre com suas credenciais para acessar sua conta</p>
        </div>

        <form
          className={styles.loginForm}
          id="loginForm"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="user"
                {...register("user", { required: "Usuário é obrigatório" })}
                className={errors.user ? styles.errorInput : ""}
              />
              <label htmlFor="user">Usuário</label>
            </div>
            {errors.user && (
              <p className={styles.errorMessage}>{errors.user.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Senha é obrigatória" })}
                className={errors.password ? styles.errorInput : ""}
              />
              <label htmlFor="password">Senha</label>
            </div>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className={styles.errorMessage}>{errors.root.message}</p>
          )}

          <button type="submit" className={styles.loginBtn}>
            <span className={styles.btnText}>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
