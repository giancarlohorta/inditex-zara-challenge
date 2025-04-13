import { fireEvent, render, screen } from "@testing-library/react";
import SearchArea from "./SearchArea";
import { vi } from "vitest";

describe("SearchArea component", () => {
  it("should call onEnter with the correct value when the Enter key is pressed", () => {
    const onEnterMock = vi.fn();

    render(<SearchArea count={0} onEnter={onEnterMock} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "Samsung" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(onEnterMock).toHaveBeenCalledWith("Samsung");
  });
  it("renders the input and results text", () => {
    render(<SearchArea count={3} onEnter={vi.fn()} />);

    const input = screen.getByRole("textbox", {
      name: /search for a smartphone/i,
    });
    const results = screen.getByText(/3 results/i);

    expect(input).toBeInTheDocument();
    expect(results).toBeInTheDocument();
  });
});
