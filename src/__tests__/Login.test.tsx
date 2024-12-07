import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import { BrowserRouter } from "react-router-dom";

// Mock navigate function
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    // Mock localStorage methods
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(jest.fn());
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => "[]");

    // Mock fetch globally
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            accessToken: "mockAccessToken",
            refreshToken: "mockRefreshToken",
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render login correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Verify form elements are rendered
    expect(screen.getByText(/login form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("should call authenticate and navigate on form submission", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for asynchronous actions to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "emilys",
            password: "emilyspass",
            expiresInMins: 30,
          }),
        }
      );

      // Check localStorage updates
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "at",
        "mockAccessToken"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "rt",
        "mockRefreshToken"
      );

      // Verify navigation
      expect(mockNavigate).toHaveBeenCalledWith("/cart");
    });
  });
});
