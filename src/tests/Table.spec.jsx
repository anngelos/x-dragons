import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../components/Table";

describe("Table", () => {
  const dragons = [
    { id: "1", name: "Draco" },
    { id: "2", name: "Smaug" },
  ];

  it("should render the dragons in the table", () => {
    render(
      <Table
        dragons={dragons}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
        onView={vi.fn()}
      />
    );

    expect(screen.getByText("Draco")).toBeDefined();
    expect(screen.getByText("Smaug")).toBeDefined();

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("should call onView when clicking the View button", () => {
    const onView = vi.fn();
    render(<Table dragons={dragons} onDelete={vi.fn()} onEdit={vi.fn()} onView={onView} />);

    const viewButtons = screen.getAllByText("Visualizar");
    fireEvent.click(viewButtons[0]);

    expect(onView).toHaveBeenCalledWith("1");
  });

  it("should call onEdit when clicking the Edit button", () => {
    const onEdit = vi.fn();
    render(<Table dragons={dragons} onDelete={vi.fn()} onEdit={onEdit} onView={vi.fn()} />);

    const editButtons = screen.getAllByText("Editar");
    fireEvent.click(editButtons[1]);

    expect(onEdit).toHaveBeenCalledWith(dragons[1]);
  });

  it("should call onDelete when clicking the Delete button", () => {
    const onDelete = vi.fn();
    render(<Table dragons={dragons} onDelete={onDelete} onEdit={vi.fn()} onView={vi.fn()} />);

    const deleteButtons = screen.getAllByText("Excluir");
    fireEvent.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("should render an empty table if there are no dragons", () => {
    render(<Table dragons={[]} onDelete={vi.fn()} onEdit={vi.fn()} onView={vi.fn()} />);
    expect(screen.queryByRole("row", { name: /Draco/i })).toBeNull();
  });
});