import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterColor from "./FilterColor";

describe("FilterColor component", () => {
  it("should render closed state initially with 'FILTRAR' button and no clear button", () => {
    render(<FilterColor onIsOpen={() => {}} />);

    const openButton = screen.getByRole("button", { name: /filtrar/i });
    expect(openButton).toBeInTheDocument();
    expect(openButton.textContent).toMatch(/^filtrar\s*$/i);

    const clearButton = screen.queryByRole("button", { name: /clear input/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it("should open filter and display color options when clicking the 'FILTRAR' button", async () => {
    const mockOnIsOpen = vi.fn();
    render(<FilterColor onIsOpen={mockOnIsOpen} />);

    const openButton = screen.getByRole("button", { name: /filtrar/i });
    fireEvent.click(openButton);
    expect(mockOnIsOpen).toHaveBeenCalledWith(true);

    const closeButton = screen.getByRole("button", { name: /cerrar/i });
    expect(closeButton).toBeInTheDocument();

    const colorButton = screen.getByRole("button", { name: "1" });
    expect(colorButton).toBeInTheDocument();

    fireEvent.click(colorButton);

    fireEvent.click(closeButton);

    expect(screen.getByRole("button", { name: /(1)/i })).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: /clear filter/i });
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);

    expect(
      screen.queryByRole("button", { name: /(1)/i })
    ).not.toBeInTheDocument();
  });

  it("should update selection when a color is clicked and show clear button", () => {
    render(<FilterColor onIsOpen={() => {}} />);

    const openButton = screen.getByRole("button", { name: /filtrar/i });
    fireEvent.click(openButton);

    const colorButton = screen.getByRole("button", { name: "1" });
    fireEvent.click(colorButton);
  });
});
