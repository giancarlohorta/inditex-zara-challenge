import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza título", () => {
  render(<App />);
  expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});
