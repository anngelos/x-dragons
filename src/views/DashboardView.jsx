import Table from "../components/Table";
import styles from "../styles/DashboardView.module.css";

function DashboardView() {
  return (
    <>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.dashboardContainer}>
        <button type="submit" className={styles.createDragBtn}>
          <span className={styles.btnText}>Cadastrar Drag</span>
        </button>
        <Table />
      </div>
    </>
  );
}

export default DashboardView;
