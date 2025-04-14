import { fireEvent, render, screen } from "@testing-library/react";
import ScrollSimilarProducts from "./ScrollSimilarProducts";
import { Product } from "../../../types/product";
import { BrowserRouter } from "react-router-dom";

const mockList: Product[] = [
  { id: "1", brand: "Brand A", basePrice: 100, name: "Product 1" },
  { id: "2", brand: "Brand B", basePrice: 200, name: "Product 2" },
  { id: "3", brand: "Brand C", basePrice: 300, name: "Product 3" },
  { id: "4", brand: "Brand D", basePrice: 400, name: "Product 4" },
  { id: "5", brand: "Brand E", basePrice: 500, name: "Product 5" },
  { id: "6", brand: "Brand F", basePrice: 600, name: "Product 6" },
  { id: "7", brand: "Brand G", basePrice: 700, name: "Product 7" },
  { id: "8", brand: "Brand H", basePrice: 800, name: "Product 8" },
  { id: "9", brand: "Brand I", basePrice: 900, name: "Product 9" },
  { id: "10", brand: "Brand J", basePrice: 1000, name: "Product 10" },
];

const ComponentWrapper = () => {
  return (
    <BrowserRouter>
      <ScrollSimilarProducts list={mockList} />
    </BrowserRouter>
  );
};

describe("ScrollSimilarProducts", () => {
  it("should render list of products", () => {
    render(<ComponentWrapper />);

    mockList.forEach((product) => {
      expect(screen.getByText(product.name.toUpperCase())).toBeInTheDocument();
    });
  });

  it("renders product list and custom thumb", () => {
    render(<ComponentWrapper />);

    const listEl = screen.getByRole("list");
    expect(listEl).toBeInTheDocument();

    const thumbEl = screen.getByTestId("thumb");
    const scrollbar = screen.getByTestId("bar");

    Object.defineProperty(listEl, "scrollWidth", {
      value: 1500,
      writable: true,
    });
    Object.defineProperty(listEl, "clientWidth", {
      value: 500,
      writable: true,
    });

    Object.defineProperty(scrollbar, "clientWidth", {
      value: 200,
      writable: true,
    });
    Object.defineProperty(thumbEl, "clientWidth", {
      value: 50,
      writable: true,
    });
    expect(thumbEl).toBeInTheDocument();

    listEl.scrollLeft = 250;

    fireEvent.scroll(listEl, { target: { scrollLeft: 250 } });

    expect(parseFloat(thumbEl.style.left)).toBeCloseTo(37.5, 1);
  });
  it("handles drag events to update scroll position", () => {
    render(<ComponentWrapper />);

    const listEl = screen.getByRole("list");
    const thumbEl = screen.getByTestId("thumb");
    const scrollbar = screen.getByTestId("bar");

    Object.defineProperty(listEl, "scrollWidth", {
      value: 1500,
      writable: true,
    });
    Object.defineProperty(listEl, "clientWidth", {
      value: 500,
      writable: true,
    });
    Object.defineProperty(scrollbar, "clientWidth", {
      value: 200,
      writable: true,
    });
    Object.defineProperty(thumbEl, "clientWidth", {
      value: 50,
      writable: true,
    });

    fireEvent.mouseDown(thumbEl, { clientX: 100 });
    listEl.scrollLeft = 0;
    fireEvent.mouseMove(document, { clientX: 150 });

    expect(listEl.scrollLeft).toBeCloseTo(333.5, 0);

    fireEvent.mouseUp(document);
  });
});
