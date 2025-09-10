import styles from "../styles/Table.module.css";

function Table() {
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
          <tr>
            <td>1</td>
            <td>Produto A</td>
            <td>
              <button className={styles.editBtn}>Editar</button>
              <button className={styles.deleteBtn}>Excluir</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Produto B</td>
            <td>
              <button className={styles.editBtn}>Editar</button>
              <button className={styles.deleteBtn}>Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Table;
