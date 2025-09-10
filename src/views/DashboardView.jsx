import { useEffect, useState } from "react";
import Table from "../components/Table";
import styles from "../styles/DashboardView.module.css";
import { openCreateDragonModal, openEditDragonModal } from "../components/DragonModal";
import { openViewDragonModal } from "../components/ViewDragon";
import {
  getDragons,
  deleteDragon,
  createDragon,
  editDragon,
  getDragonById,
} from "../services/api";

function DashboardView() {
  const [dragons, setDragons] = useState([]);

  const fetchDragons = async () => {
    const data = await getDragons();
    const sorted = data.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    setDragons(sorted);
  };

  const handleCreate = () => {
    openCreateDragonModal(async (data) => {
      await createDragon(data);
      fetchDragons();
    });
  };

  const handleDelete = async (id) => {
    await deleteDragon(id);
    setDragons((prev) => prev.filter((dragon) => dragon.id !== id));
  };

  const handleEdit = (dragon) => {
    openEditDragonModal(dragon, async (data) => {
      await editDragon(dragon.id, data);
      fetchDragons();
    });
  };

  const handleView = async (id) => {
    const dragon = await getDragonById(id);
    if (dragon) {
      openViewDragonModal(dragon);
    }
  };

  useEffect(() => {
    fetchDragons();
  }, []);

  return (
    <>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.dashboardContainer}>
        <button
          type="submit"
          className={styles.createDragBtn}
          onClick={handleCreate}
        >
          <span className={styles.btnText}>Cadastrar Drag</span>
        </button>
        <Table
          dragons={dragons}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>
    </>
  );
}

export default DashboardView;
