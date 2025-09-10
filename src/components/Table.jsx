import styles from "../styles/Table.module.css";

function Table({dragons, onDelete, onEdit, onView}) {
  return (
    <>
      <table className={styles.dashboardTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
          <tr key={dragon.id}>
            <td>{dragon.id}</td>
            <td>{dragon.name}</td>
            <td className={styles.actions}>
              <button className={styles.viewBtn} onClick={() => onView(dragon.id)}>Visualizar</button>
              <button className={styles.editBtn} onClick={() => onEdit(dragon)}>Editar</button>
              <button className={styles.deleteBtn} onClick={() => onDelete(dragon.id)}>Excluir</button>
            </td>
          </tr>
        ))}          
        </tbody>
      </table>
    </>
  );
}

export default Table;
