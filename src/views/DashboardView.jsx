import { useEffect, useState } from "react";
import Table from "../components/Table";
import styles from "../styles/DashboardView.module.css";
import { getDragons, deleteDragon } from "../services/api";

function DashboardView() {
  const [dragons, setDragons] = useState([]);

  const fetchDragons = async () => {
    const data = await getDragons();
    const sorted = data.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    setDragons(sorted);
  };

  const handleDelete = async (id) => {
    await deleteDragon(id);
    setDragons((prev) => prev.filter((dragon) => dragon.id !== id));
  };

  const handleEdit = () => {
    alert("OI VOCE CLICOU EM EDITAR")
  }

  useEffect(() => {
    fetchDragons();
  }, []);

  return (
    <>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.dashboardContainer}>
        <button type="submit" className={styles.createDragBtn}>
          <span className={styles.btnText}>Cadastrar Drag</span>
        </button>
        <Table dragons={dragons} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </>
  );
}

export default DashboardView;
