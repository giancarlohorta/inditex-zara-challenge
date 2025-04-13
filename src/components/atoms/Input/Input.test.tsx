import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./Input";

describe("Input Component", () => {
  it("should update the input value when the user types and display the clear button", () => {
    render(<Input placeholder="Search" onEnter={vi.fn()} />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("aria-label", "Search");

    fireEvent.change(inputElement, { target: { value: "test value" } });
    expect(inputElement).toHaveValue("test value");

    const clearButton = screen.getByRole("button", { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();
  });

  it("should call onEnter with the correct value when the Enter key is pressed", () => {
    const onEnterMock = vi.fn();
    render(<Input placeholder="Search" onEnter={onEnterMock} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "hello" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(onEnterMock).toHaveBeenCalledWith("hello");
  });

  it("should clear the input and call onEnter with empty string when the clear button is clicked", () => {
    const onEnterMock = vi.fn();
    render(<Input placeholder="Search" onEnter={onEnterMock} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "clear me" } });
    expect(inputElement).toHaveValue("clear me");

    const clearButton = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(clearButton);

    expect(inputElement).toHaveValue("");
    expect(onEnterMock).toHaveBeenCalledWith("");
  });
});
