import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Typography from "./Typography";

import style from "./Typography.module.css";
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_WEIGHTS,
} from "./Typography.types";

describe("Typography Component", () => {
  describe("Rendering", () => {
    it("renders as <p> by default", () => {
      render(<Typography>Hello World</Typography>);
      const element = screen.getByText("Hello World");
      expect(element.tagName.toLowerCase()).toBe("p");
    });

    it("renders as specified element", () => {
      render(<Typography as="h1">Heading</Typography>);
      const element = screen.getByText("Heading");
      expect(element.tagName.toLowerCase()).toBe("h1");
    });

    it("renders children correctly", () => {
      render(
        <Typography>
          <span>Child 1</span>
          <span>Child 2</span>
        </Typography>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("applies default size (md)", () => {
      render(<Typography>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveClass(style["size-md"]);
    });

    it("applies all size variants", () => {
      const sizes = Object.values(TYPOGRAPHY_SIZES);
      sizes.forEach((size) => {
        const { unmount } = render(
          <Typography size={size}>Size {size}</Typography>
        );
        const element = screen.getByText(`Size ${size}`);
        expect(element).toHaveClass(style[`size-${size}`]);
        unmount();
      });
    });
  });

  describe("Weights", () => {
    it("applies default weight (regular)", () => {
      render(<Typography>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveClass(style["weight-regular"]);
    });

    it("applies custom weight", () => {
      render(<Typography weight="bold">Bold Text</Typography>);
      const element = screen.getByText("Bold Text");
      expect(element).toHaveClass(style["weight-bold"]);
    });

    it("applies all weight variants", () => {
      const weights = Object.values(TYPOGRAPHY_WEIGHTS);
      weights.forEach((weight) => {
        const { unmount } = render(
          <Typography weight={weight}>Weight {weight}</Typography>
        );
        const element = screen.getByText(`Weight ${weight}`);
        expect(element).toHaveClass(style[`weight-${weight}`]);
        unmount();
      });
    });
  });

  describe("Colors", () => {
    it("applies default color (primary)", () => {
      render(<Typography>Text</Typography>);
      const element = screen.getByText("Text");
      expect(element).toHaveClass(style["color-primary"]);
    });

    it("applies custom color", () => {
      render(<Typography color="secondary">Colored Text</Typography>);
      const element = screen.getByText("Colored Text");
      expect(element).toHaveClass(style["color-secondary"]);
    });

    it("applies all color variants", () => {
      const colors = Object.values(TYPOGRAPHY_COLORS);
      colors.forEach((color) => {
        const { unmount } = render(
          <Typography color={color}>Color {color}</Typography>
        );
        const element = screen.getByText(`Color ${color}`);
        expect(element).toHaveClass(style[`color-${color}`]);
        unmount();
      });
    });
  });

  describe("Polymorphic Behavior", () => {
    it("renders as button with onClick", () => {
      const handleClick = vi.fn();
      render(
        <Typography as="button" onClick={handleClick}>
          Click me
        </Typography>
      );

      const button = screen.getByRole("button");
      expect(button.tagName.toLowerCase()).toBe("button");

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders as anchor with href", () => {
      render(
        <Typography as="a" href="https://example.com">
          Link
        </Typography>
      );

      const link = screen.getByRole("link");
      expect(link.tagName.toLowerCase()).toBe("a");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("renders as div with data attributes", () => {
      render(
        <Typography as="div" data-testid="custom-div" data-value="123">
          Div Content
        </Typography>
      );

      const div = screen.getByTestId("custom-div");
      expect(div.tagName.toLowerCase()).toBe("div");
      expect(div).toHaveAttribute("data-value", "123");
    });

    it("renders as heading with id", () => {
      render(
        <Typography as="h2" id="custom-heading">
          Heading with ID
        </Typography>
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("id", "custom-heading");
    });
  });

  describe("Custom Props", () => {
    it("applies custom className", () => {
      render(<Typography className="custom-class">Custom</Typography>);
      const element = screen.getByText("Custom");
      expect(element).toHaveClass("custom-class");
    });

    it("merges custom className with variant classes", () => {
      render(
        <Typography size="lg" weight="bold" className="custom">
          Text
        </Typography>
      );
      const element = screen.getByText("Text");
      expect(element).toHaveClass(style["size-lg"]);
      expect(element).toHaveClass(style["weight-bold"]);
      expect(element).toHaveClass("custom");
    });

    it("spreads additional HTML attributes", () => {
      render(
        <Typography title="Tooltip text" aria-label="Description">
          Text
        </Typography>
      );
      const element = screen.getByText("Text");
      expect(element).toHaveAttribute("title", "Tooltip text");
      expect(element).toHaveAttribute("aria-label", "Description");
    });
  });

  describe("Prop Combinations", () => {
    it("applies multiple variants correctly", () => {
      render(
        <Typography as="h1" size="xl" weight="bold" color="secondary">
          Title
        </Typography>
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass(style.typography);
      expect(heading).toHaveClass(style["size-xl"]);
      expect(heading).toHaveClass(style["weight-bold"]);
      expect(heading).toHaveClass(style["color-secondary"]);
    });

    it("works with all element types", () => {
      const elements = [
        "p",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ] as const;

      elements.forEach((element) => {
        const { unmount } = render(
          <Typography as={element}>Element {element}</Typography>
        );
        const el = screen.getByText(`Element ${element}`);
        expect(el.tagName.toLowerCase()).toBe(element);
        unmount();
      });
    });
  });

  // ==========================================
  // EDGE CASES
  // ==========================================
  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<Typography children={undefined}></Typography>);
      // Não deve quebrar
    });

    it("handles complex children structure", () => {
      render(
        <Typography>
          <strong>Bold</strong>
          {" and "}
          <em>italic</em>
          {" text"}
        </Typography>
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });

    it("handles null children gracefully", () => {
      render(<Typography>{null}</Typography>);
      // Não deve quebrar
    });
  });
});
