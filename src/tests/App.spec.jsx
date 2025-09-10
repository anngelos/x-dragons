import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

vi.mock("../views/LoginView", () => ({
  default: () => <div data-testid="login-view">Login View</div>,
}));

vi.mock("../views/DashboardView", () => ({
  default: () => <div data-testid="dashboard-view">Dashboard View</div>,
}));

describe("App", () => {
  it("should render LoginView by default", () => {
    render(<App />);
    expect(screen.getByTestId("login-view")).toBeInTheDocument();
  });

  it("should render DashboardView when the route is /dashboard", () => {
    window.history.pushState({}, "Dashboard", "/dashboard");
    render(<App />);
    expect(screen.getByTestId("dashboard-view")).toBeInTheDocument();
  });

  it("should redirect to LoginView on invalid route", () => {
    window.history.pushState({}, "Inválido", "/rota-invalida");
    render(<App />);
    expect(screen.getByTestId("login-view")).toBeInTheDocument();
  });
});
