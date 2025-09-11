import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DragonForm from "../components/DragonForm";

describe("DragonForm", () => {
  it("should render the input fields correctly", () => {
    render(<DragonForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByPlaceholderText("Nome do dragão")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tipo do dragão")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("should fill the inputs with defaultValues", () => {
    render(
      <DragonForm
        defaultValues={{ name: "Draco", type: "Fogo" }}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText("Nome do dragão")).toHaveValue("Draco");
    expect(screen.getByPlaceholderText("Tipo do dragão")).toHaveValue("Fogo");
  });

  it("should call onSubmit with the form data", async () => {
    const handleSubmit = vi.fn();
    render(<DragonForm onSubmit={handleSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Nome do dragão"), {
      target: { value: "Smaug" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tipo do dragão"), {
      target: { value: "Fogo" },
    });

    fireEvent.click(screen.getByText("Salvar"));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        { name: "Smaug", type: "Fogo" },
        expect.anything()
      )
    );
  });

  it("should call onCancel when clicking Cancel", () => {
    const handleCancel = vi.fn();
    render(<DragonForm onSubmit={vi.fn()} onCancel={handleCancel} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(handleCancel).toHaveBeenCalled();
  });
});
