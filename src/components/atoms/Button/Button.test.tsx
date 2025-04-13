import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  it("should call the onClick function when the button is clicked", () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should render the button as disabled when the disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute("aria-disabled", "true");
  });

  it("should render a Link when the link prop is provided", () => {
    render(
      <BrowserRouter>
        <Button link="/test">Test Link</Button>
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link", { name: /test link/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });
});
