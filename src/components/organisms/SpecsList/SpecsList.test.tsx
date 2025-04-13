import { render, screen } from "@testing-library/react";
import SpecsList from "./SpecsList";
import { describe, it, expect } from "vitest";
import { mockProductDetailsData } from "../../../mocks/productDetails";

describe("SpecsList component", () => {
  it("renders all specs as list items", () => {
    render(<SpecsList data={mockProductDetailsData} />);

    expect(screen.getByText("SCREEN")).toBeInTheDocument();
    expect(screen.getByText(/6.7 inch OLED/i)).toBeInTheDocument();

    expect(screen.getByText(/resolution/i)).toBeInTheDocument();
    expect(screen.getByText(/2400x1080/i)).toBeInTheDocument();

    expect(screen.getByText(/processor/i)).toBeInTheDocument();
    expect(screen.getByText(/Snapdragon 888/i)).toBeInTheDocument();

    expect(screen.getByText(/main camera/i)).toBeInTheDocument();
    expect(screen.getByText(/50MP/i)).toBeInTheDocument();

    expect(screen.getByText(/battery/i)).toBeInTheDocument();
    expect(screen.getByText(/5000mAh/i)).toBeInTheDocument();
  });

  it("renders correct number of list items", () => {
    render(<SpecsList data={mockProductDetailsData} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(
      Object.keys(mockProductDetailsData.specs).length + 3
    );
  });

  it("renders the specs list with role list", () => {
    render(<SpecsList data={mockProductDetailsData} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });
});
