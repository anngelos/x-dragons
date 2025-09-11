import { describe, it, expect, vi, beforeEach } from "vitest";

const mockClose = vi.fn();

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

vi.mock("sweetalert2-react-content", () => ({
  __esModule: true,
  default: (swal) => ({
    ...swal,
    close: mockClose,
  }),
}));

vi.mock("../components/DragonForm", () => ({
  __esModule: true,
  default: ({ onSubmit, onCancel }) => (
    <div>
      <button onClick={() => onSubmit({ name: "Draco" })}>submit</button>
      <button onClick={onCancel}>cancel</button>
    </div>
  ),
}));

import Swal from "sweetalert2";
let DragonModal;

beforeEach(async () => {
  vi.clearAllMocks();
  DragonModal = await import("../components/DragonModal");
});

describe("DragonModal", () => {
  it("openCreateDragonModal should open the modal with the correct title", () => {
    const onSubmit = vi.fn();
    DragonModal.openCreateDragonModal(onSubmit);

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.any(Object),
        html: expect.any(Object),
      })
    );
  });

  it("openCreateDragonModal should call onSubmit and close the modal", () => {
    const onSubmit = vi.fn();
    DragonModal.openCreateDragonModal(onSubmit);

    const modalConfig = Swal.fire.mock.calls[0][0];
    modalConfig.html.props.onSubmit({ name: "NovoDrag" });

    expect(onSubmit).toHaveBeenCalledWith({ name: "NovoDrag" });
    expect(mockClose).toHaveBeenCalled();
  });

  it("openCreateDragonModal should close the modal on cancel", () => {
    const onSubmit = vi.fn();
    DragonModal.openCreateDragonModal(onSubmit);

    const modalConfig = Swal.fire.mock.calls[0][0];
    modalConfig.html.props.onCancel();

    expect(mockClose).toHaveBeenCalled();
  });

  it("openEditDragonModal should open the modal with the dragon's values", () => {
    const onSubmit = vi.fn();
    const dragon = { id: "1", name: "Smaug" };

    DragonModal.openEditDragonModal(dragon, onSubmit);

    const modalConfig = Swal.fire.mock.calls[0][0];
    expect(modalConfig.html.props.defaultValues).toEqual(dragon);
  });

  it("openEditDragonModal should call onSubmit and close the modal", () => {
    const onSubmit = vi.fn();
    const dragon = { id: "2", name: "Fafnir" };

    DragonModal.openEditDragonModal(dragon, onSubmit);

    const modalConfig = Swal.fire.mock.calls[0][0];
    modalConfig.html.props.onSubmit({ name: "Atualizado" });

    expect(onSubmit).toHaveBeenCalledWith({ name: "Atualizado" });
    expect(mockClose).toHaveBeenCalled();
  });

  it("openEditDragonModal should close the modal on cancel", () => {
    const onSubmit = vi.fn();
    DragonModal.openEditDragonModal({ id: "3", name: "Viserion" }, onSubmit);

    const modalConfig = Swal.fire.mock.calls[0][0];
    modalConfig.html.props.onCancel();

    expect(mockClose).toHaveBeenCalled();
  });
});
