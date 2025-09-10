import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import LoginView from "../views/LoginView.jsx";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

describe("LoginView", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it("renders the username and password fields", () => {
    render(<LoginView />);
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<LoginView />);
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
    expect(await screen.findByText("Usuário é obrigatório")).toBeInTheDocument();
    expect(await screen.findByText("Senha é obrigatória")).toBeInTheDocument();
  });

  it("shows error when submitting incorrect credentials", async () => {
    render(<LoginView />);
    fireEvent.input(screen.getByLabelText(/usuário/i), {
      target: { value: "errado" },
    });
    fireEvent.input(screen.getByLabelText(/senha/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
    expect(await screen.findByText("Usuário ou senha incorretos!")).toBeInTheDocument();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("calls navigate when submitting correct credentials", async () => {
    render(<LoginView />);
    fireEvent.input(screen.getByLabelText(/usuário/i), {
      target: { value: "targaryen" },
    });
    fireEvent.input(screen.getByLabelText(/senha/i), {
      target: { value: "valiria" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
