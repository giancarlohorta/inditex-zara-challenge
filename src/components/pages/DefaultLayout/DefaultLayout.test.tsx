import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import { vi } from "vitest";

vi.mock("../../../hook/useCart", () => ({
  useCart: () => ({
    totalCartItems: 3,
  }),
}));

describe("DefaultLayout", () => {
  it("should render the Header and children outside the /cart route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DefaultLayout>
          <h1>Page Content</h1>
        </DefaultLayout>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/mbst logo/i)).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });

  it("should hide the Header on the /cart route", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <DefaultLayout>
          <p>Cart Page</p>
        </DefaultLayout>
      </MemoryRouter>
    );

    expect(screen.queryByLabelText(/shopping cart/i)).not.toBeInTheDocument();

    expect(screen.queryByText("3")).not.toBeInTheDocument();

    expect(screen.getByText("Cart Page")).toBeInTheDocument();
  });
});
