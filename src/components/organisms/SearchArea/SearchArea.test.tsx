import { fireEvent, render, screen } from "@testing-library/react";
import SearchArea from "./SearchArea";
import { vi } from "vitest";

describe("SearchArea", () => {
  const setup = (count = 0, onEnter = vi.fn()) => {
    render(<SearchArea count={count} onEnter={onEnter} />);
    const input = screen.getByRole("textbox");
    return { input, onEnter };
  };

  describe("Input behavior", () => {
    it("calls onEnter with correct value on Enter key", () => {
      const { input, onEnter } = setup();

      fireEvent.change(input, { target: { value: "Samsung" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

      expect(onEnter).toHaveBeenCalledWith("Samsung");
    });

    it("renders input with correct placeholder", () => {
      const { input } = setup();
      expect(input).toHaveAttribute(
        "placeholder",
        "Search for a smartphone..."
      );
    });
  });

  describe("Results display", () => {
    it("displays result count text when filter is closed", () => {
      setup(3);
      expect(screen.getByText(/3 results/i)).toBeInTheDocument();
    });

    it("hides result count when filter is opened", () => {
      setup(3);

      const filterToggle = screen.getByRole("button", { name: /filtrar/i });
      fireEvent.click(filterToggle);

      expect(screen.queryByText(/3 results/i)).not.toBeInTheDocument();
    });
  });
});
