import { useForm } from "react-hook-form";
import styles from "../styles/DragonForm.module.css";

function DragonForm({ defaultValues = {}, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className={styles.label}>Nome:</label>
        <input
          {...register("name")}
          className={styles.nameInput}
          placeholder="Nome do dragão"
          required
        />
      </div>

      <div>
        <label className={styles.label}>Tipo:</label>
        <input
          {...register("type")}
          className={styles.typeInput}
          placeholder="Tipo do dragão"
          required
        />
      </div>

      <div className={styles.btnContainer}>
        <button type="submit" className={styles.saveBtn}>
          Salvar
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default DragonForm;
