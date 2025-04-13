import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

const renderHeader = (props = {}) =>
  render(
    <BrowserRouter>
      <Header {...props} />
    </BrowserRouter>
  );

describe("Header", () => {
  it("renders the logo with link to homepage end does not render cart button when 'cart' is false", () => {
    renderHeader();

    const logo = screen.getByLabelText(/mbst logo/i);
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /mbst logo/i });
    expect(homeLink).toHaveAttribute("href", "/");

    const cartIcon = screen.queryByLabelText(/shopping cart/i);
    expect(cartIcon).not.toBeInTheDocument();
  });

  it("renders the cart button and the count when count is a number", () => {
    renderHeader({ cart: true, count: 3 });

    const count = screen.getByText("3");
    expect(count).toBeInTheDocument();
    expect(count).toHaveAttribute("aria-live", "polite");
    expect(count).toHaveAttribute("aria-atomic", "true");
    const cartLink = screen.getByRole("link", { name: /shopping cart/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("does not render count when 'count' is undefined", () => {
    renderHeader({ cart: true });

    const count = screen.queryByText("0");
    expect(count).not.toBeInTheDocument();
  });

  it("has accessible roles and labels", () => {
    renderHeader({ cart: true, count: 2 });

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /main navigation/i })
    ).toBeInTheDocument();
  });
});
