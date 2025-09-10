import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import DashboardView from "../views/DashboardView";

vi.mock("../services/api", () => ({
  getDragons: vi.fn(),
  deleteDragon: vi.fn(),
  createDragon: vi.fn(),
  editDragon: vi.fn(),
  getDragonById: vi.fn(),
}));

vi.mock("../components/DragonModal", () => ({
  openCreateDragonModal: vi.fn(),
  openEditDragonModal: vi.fn(),
}));

vi.mock("../components/ViewDragon", () => ({
  openViewDragonModal: vi.fn(),
}));

vi.mock("../components/Table", () => ({
  default: ({ dragons, onDelete, onEdit, onView }) => (
    <div data-testid="mock-table">
      {dragons.map((d) => (
        <div key={d.id}>
          <span>{d.name}</span>
          <button onClick={() => onDelete(d.id)}>Excluir</button>
          <button onClick={() => onEdit(d)}>Editar</button>
          <button onClick={() => onView(d.id)}>Visualizar</button>
        </div>
      ))}
    </div>
  ),
}));

import {
  getDragons,
  deleteDragon,
  createDragon,
  editDragon,
  getDragonById,
} from "../services/api";
import {
  openCreateDragonModal,
  openEditDragonModal,
} from "../components/DragonModal";
import { openViewDragonModal } from "../components/ViewDragon";

describe("DashboardView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display 'Loading...' before loading the dragons", async () => {
    getDragons.mockResolvedValueOnce([]);
    render(<DashboardView />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
    await waitFor(() => expect(getDragons).toHaveBeenCalled());
  });

  it("should render dragons sorted in alphabetical order", async () => {
    getDragons.mockResolvedValueOnce([
      { id: "2", name: "Zed" },
      { id: "1", name: "Aragon" },
    ]);
    render(<DashboardView />);
    await waitFor(() => {
      const items = screen
        .getAllByText(/Aragon|Zed/)
        .map((el) => el.textContent);
      expect(items).toEqual(["Aragon", "Zed"]); // ordenado
    });
  });

  it("should open creation modal when clicking 'Register Drag'", async () => {
    getDragons.mockResolvedValueOnce([]);
    render(<DashboardView />);
    const button = await screen.findByText("Cadastrar Drag");
    fireEvent.click(button);
    expect(openCreateDragonModal).toHaveBeenCalled();
  });

  it("when creating a dragon, should call createDragon and reload the list", async () => {
    getDragons.mockResolvedValueOnce([{ id: "1", name: "Antigo" }]);
    render(<DashboardView />);

    await screen.findByTestId("mock-table");

    fireEvent.click(screen.getByText("Cadastrar Drag"));
    expect(openCreateDragonModal).toHaveBeenCalled();

    const callback = openCreateDragonModal.mock.calls[0][0];

    createDragon.mockResolvedValueOnce({ id: "2", name: "Novo" });

    getDragons.mockResolvedValueOnce([
      { id: "1", name: "Antigo" },
      { id: "2", name: "Novo" },
    ]);

    await callback({ name: "Novo" });

    expect(createDragon).toHaveBeenCalledWith({ name: "Novo" });
    expect(getDragons).toHaveBeenCalledTimes(2);
  });

  it("should delete a dragon when clicking the delete button", async () => {
    getDragons.mockResolvedValueOnce([{ id: "1", name: "Draco" }]);
    deleteDragon.mockResolvedValueOnce({});
    render(<DashboardView />);
    await screen.findByText("Draco");

    fireEvent.click(screen.getByText("Excluir"));
    await waitFor(() =>
      expect(screen.queryByText("Draco")).not.toBeInTheDocument()
    );
  });

  it("should open edit modal when clicking edit", async () => {
    getDragons.mockResolvedValueOnce([{ id: "1", name: "Draco" }]);
    render(<DashboardView />);
    await screen.findByText("Draco");

    fireEvent.click(screen.getByText("Editar"));
    expect(openEditDragonModal).toHaveBeenCalledWith(
      { id: "1", name: "Draco" },
      expect.any(Function)
    );
  });

  it("edit callback should call editDragon and reload the list", async () => {
    getDragons
      .mockResolvedValueOnce([{ id: "1", name: "Draco" }])
      .mockResolvedValueOnce([{ id: "1", name: "Atualizado" }]);
    render(<DashboardView />);
    await screen.findByText("Draco");

    fireEvent.click(screen.getByText("Editar"));
    const callback = openEditDragonModal.mock.calls[0][1];

    editDragon.mockResolvedValueOnce({ id: "1", name: "Atualizado" });
    await callback({ name: "Atualizado" });

    expect(editDragon).toHaveBeenCalledWith("1", { name: "Atualizado" });
    expect(getDragons).toHaveBeenCalledTimes(2);
  });

  it("should open view modal if getDragonById returns a dragon", async () => {
    getDragons.mockResolvedValueOnce([{ id: "1", name: "Draco" }]);
    getDragonById.mockResolvedValueOnce({ id: "1", name: "Draco" });
    render(<DashboardView />);
    await screen.findByTestId("mock-table");
    const viewBtn = screen.getByText("Visualizar");
    fireEvent.click(viewBtn);
    await waitFor(() =>
      expect(openViewDragonModal).toHaveBeenCalledWith({
        id: "1",
        name: "Draco",
      })
    );
  });

  it("should not open view modal if getDragonById returns null", async () => {
    getDragons.mockResolvedValueOnce([{ id: "1", name: "Draco" }]);
    getDragonById.mockResolvedValueOnce(null);
    render(<DashboardView />);
    await screen.findByText("Draco");

    fireEvent.click(screen.getByText("Visualizar"));
    await waitFor(() => expect(openViewDragonModal).not.toHaveBeenCalled());
  });
});
