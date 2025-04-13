import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Item from "./Item";
import { mockList } from "../../../mocks/products";
import style from "../../atoms/Typography/Typography.module.css";

const renderItem = () =>
  render(
    <BrowserRouter>
      <Item item={mockList[0]} />
    </BrowserRouter>
  );

describe("Item component", () => {
  it("renders the image with correct alt text, the brand, name and price", () => {
    renderItem();
    const image = screen.getByAltText(/galaxy a05s image/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("loading", "lazy");
    expect(screen.getByText(/Samsung/i)).toBeInTheDocument();
    expect(screen.getByText(/Galaxy A05s/i)).toBeInTheDocument();
    expect(screen.getByText(/119 EUR/i)).toBeInTheDocument();
  });

  it("wraps content in a link pointing to the product page", () => {
    renderItem();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/SMG-A05S");
  });

  it("has accessible attributes", () => {
    renderItem();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("role", "link");
    expect(link).toHaveAttribute("aria-labelledby", "title-SMG-A05S");
  });

  it("mouseover changes text color", () => {
    renderItem();

    const itemElement = screen.getByRole("link");
    fireEvent.mouseEnter(itemElement);

    const element = screen.getByText(/Galaxy A05s/i);

    expect(element).toHaveClass(style["color-secondary"]);

    fireEvent.mouseLeave(itemElement);
    expect(element).toHaveClass(style["color-primary"]);
  });
});
