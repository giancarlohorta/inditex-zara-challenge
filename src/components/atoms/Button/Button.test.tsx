import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Button from "./Button";
import { vi } from "vitest";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Button Component", () => {
  describe("Render", () => {
    it("renders as button by default", () => {
      render(<Button onClick={vi.fn()}>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
    it("renders as link when href is provided", () => {
      renderWithRouter(<Button href="/test">Test Link</Button>);
      const link = screen.getByRole("link", { name: /test link/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });
  });
  describe("Variants", () => {
    it("applies primary variant by default", () => {
      render(<Button onClick={vi.fn()}>Primary Button</Button>);
      const button = screen.getByRole("button", { name: /primary button/i });
      expect(button).toHaveClass(/primary/);
    });
    it("applies secondery variant", () => {
      render(
        <Button onClick={vi.fn()} variant="secondary">
          Secondary Button
        </Button>
      );
      const button = screen.getByRole("button", { name: /secondary button/i });
      expect(button).toHaveClass(/secondary/);
    });
    it("applies ghost variant", () => {
      render(
        <Button onClick={vi.fn()} variant="ghost">
          Ghost Button
        </Button>
      );
      const button = screen.getByRole("button", { name: /ghost button/i });
      expect(button).toHaveClass(/ghost/);
    });
  });
  describe("Sizes", () => {
    it("applies default size when not specified", () => {
      render(<Button onClick={vi.fn()}>Default</Button>);
      const button = screen.getByRole("button", { name: /default/i });
      expect(button.className).not.toMatch(/sm/);
      expect(button.className).not.toMatch(/lg/);
    });
    it("applies small size", () => {
      render(
        <Button onClick={vi.fn()} size="sm">
          Small
        </Button>
      );
      const button = screen.getByRole("button", { name: /small/i });
      expect(button.className).toMatch(/sm/);
    });
    it("applies large size", () => {
      render(
        <Button onClick={vi.fn()} size="lg">
          Large
        </Button>
      );
      const button = screen.getByRole("button", { name: /large/i });
      expect(button.className).toMatch(/lg/);
    });
  });
  describe("Interactions", () => {
    it("calls onClick with MouseEvent when clicked", () => {
      const onClickMock = vi.fn();
      render(<Button onClick={onClickMock}>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      fireEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "click",
        })
      );
    });

    it("does not call onClick when disabled", () => {
      const onClickMock = vi.fn();
      render(
        <Button onClick={onClickMock} disabled>
          Click me
        </Button>
      );
      const button = screen.getByRole("button", { name: /click me/i });
      fireEvent.click(button);
      expect(button).toBeDisabled();
      expect(onClickMock).not.toHaveBeenCalled();
    });
    it("prevents navigation when Link is disabled", () => {
      renderWithRouter(
        <Button href="/test" disabled>
          Disabled Link
        </Button>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Accessibility", () => {
    it("has type='button' by default", () => {
      render(<Button onClick={vi.fn()}>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("has aria-disabled when disabled", () => {
      render(
        <Button disabled onClick={vi.fn()}>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toBeDisabled();
    });

    it("supports custom aria-label", () => {
      render(
        <Button aria-label="Custom label" onClick={vi.fn()}>
          Icon
        </Button>
      );
      const button = screen.getByRole("button", { name: "Custom label" });
      expect(button).toBeInTheDocument();
    });
  });
});
