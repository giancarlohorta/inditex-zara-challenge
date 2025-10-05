import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonColor from "./ButtonColor";

const mockColor = {
  name: "Red",
  hexCode: "#FF0000",
  imageUrl: "red.png",
};

describe("ButtonColor Component", () => {
  describe("Rendering", () => {
    it("renders button with correct aria-label", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button", {
        name: "Select Red color",
      });
      expect(button).toBeInTheDocument();
    });

    it("renders color swatch with correct background", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const swatch = screen
        .getByRole("button")
        .querySelector('[aria-hidden="true"]');
      expect(swatch).toHaveStyle({ backgroundColor: "#FF0000" });
    });
  });

  describe("Active State", () => {
    it("applies active class when selected", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#FF0000"
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button");
      expect(button.className).toMatch(/active/);
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("does not apply active class when not selected", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button");
      expect(button.className).not.toMatch(/active/);
      expect(button).toHaveAttribute("aria-pressed", "false");
    });

    it("handles no selectedHexCode (undefined)", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode={undefined}
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Interactions", () => {
    it("calls onSelected with correct data when clicked", () => {
      const onSelectedMock = vi.fn();
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={onSelectedMock}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(onSelectedMock).toHaveBeenCalledTimes(1);
      expect(onSelectedMock).toHaveBeenCalledWith({
        hexCode: "#FF0000",
        imageUrl: "red.png",
        colorName: "Red",
      });
    });

    it("does not call onSelected when disabled", () => {
      const onSelectedMock = vi.fn();
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={onSelectedMock}
          disabled
        />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(button).toBeDisabled();
      expect(onSelectedMock).not.toHaveBeenCalled();
    });
  });

  describe("Sizes", () => {
    it("applies default size when not specified", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button");
      expect(button.className).toMatch(/size-default/);
    });

    it("applies small size", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
          size="sm"
        />
      );

      const button = screen.getByRole("button");
      expect(button.className).toMatch(/size-sm/);
    });

    it("applies large size", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
          size="lg"
        />
      );

      const button = screen.getByRole("button");
      expect(button.className).toMatch(/size-lg/);
    });
  });

  describe("Accessibility", () => {
    it("has type='button'", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("has title with color name for tooltip", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Red");
    });

    it("hides swatch from screen readers", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
        />
      );

      const swatch = screen
        .getByRole("button")
        .querySelector('[aria-hidden="true"]');
      expect(swatch).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      render(
        <ButtonColor
          color={mockColor}
          selectedHexCode="#0000FF"
          onSelected={vi.fn()}
          className="custom-class"
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("handles color without imageUrl", () => {
      const colorWithoutImage = {
        name: "Blue",
        hexCode: "#0000FF",
        imageUrl: undefined,
      };

      const onSelectedMock = vi.fn();
      render(
        <ButtonColor
          color={colorWithoutImage}
          selectedHexCode="#FF0000"
          onSelected={onSelectedMock}
        />
      );

      fireEvent.click(screen.getByRole("button"));

      expect(onSelectedMock).toHaveBeenCalledWith({
        hexCode: "#0000FF",
        imageUrl: undefined,
        colorName: "Blue",
      });
    });
  });
});
