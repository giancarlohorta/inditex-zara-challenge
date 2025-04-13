import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";
import { BrowserRouter } from "react-router-dom";
import { mockList } from "../../../mocks/products";

const renderList = (props = {}) =>
  render(
    <BrowserRouter>
      <ListItem list={mockList} {...props} />
    </BrowserRouter>
  );

describe("ListItem component", () => {
  it("renders all products", () => {
    renderList();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockList.length);
    expect(links[0]).toHaveTextContent(/Galaxy A05s/i);
    expect(links[1]).toHaveTextContent(/Iphone 16/i);
  });

  it("uses default aria-label 'Product list'", () => {
    renderList();
    const section = screen.getByLabelText("Product list");
    expect(section).toBeInTheDocument();
  });

  it("uses 'Related products' label when row is true", () => {
    renderList({ row: true });
    const section = screen.getByLabelText("Related products");
    expect(section).toBeInTheDocument();
  });
});
