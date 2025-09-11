import { describe, it, expect, vi, beforeEach } from "vitest";
import Swal from "sweetalert2";
import { openViewDragonModal } from "../components/ViewDragon";

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn() },
}));

describe("openViewDragonModal / ViewDragon Component", () => {
  const dragon = {
    id: "123",
    name: "Alduin",
    type: "Fogo",
    createdAt: "2023-01-01T12:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should open the modal with the dragon's data", () => {
    openViewDragonModal(dragon);

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Alduin",
        icon: "info",
        confirmButtonText: "Fechar",
      })
    );

    const callArgs = Swal.fire.mock.calls[0][0];
    expect(callArgs.html).toContain("<strong>ID:</strong> 123");
    expect(callArgs.html).toContain("<strong>Tipo:</strong> Fogo");
  });

  it("should display 'N/A' when the type is undefined", () => {
    const dragonSemTipo = { ...dragon, type: undefined };

    openViewDragonModal(dragonSemTipo);

    const callArgs = Swal.fire.mock.calls[0][0];
    expect(callArgs.html).toContain("<strong>Tipo:</strong> N/A");
  });

  it("should correctly format the creation date", () => {
    openViewDragonModal(dragon);

    const callArgs = Swal.fire.mock.calls[0][0];
    const expectedDate = new Date(dragon.createdAt).toLocaleString();

    expect(callArgs.html).toContain(`<strong>Criado em:</strong> ${expectedDate}`);
  });
});
