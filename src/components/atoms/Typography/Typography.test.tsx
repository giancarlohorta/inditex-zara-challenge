import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Typography from "./Typography";
import style from "./Typography.module.css";

describe("Typography Component", () => {
  it("renders content as a <p> element by default", () => {
    render(<Typography content="Hello World" />);
    const element = screen.getByText("Hello World");
    expect(element.tagName.toLowerCase()).toBe("p");

    expect(element).toHaveClass(style.typography);
  });

  it("renders using a specified element (as h1)", () => {
    render(<Typography content="Heading" as="h1" />);
    const element = screen.getByText("Heading");
    expect(element.tagName.toLowerCase()).toBe("h1");
  });

  it("applies custom class names", () => {
    render(<Typography content="Test" className="custom-class" />);
    const element = screen.getByText("Test");

    expect(element).toHaveClass("custom-class");
  });

  it("applies the correct size, weight, and color classes", () => {
    render(
      <Typography
        content="Styled Text"
        size="lg"
        weight="bold"
        color="secondary"
      />
    );
    const element = screen.getByText("Styled Text");

    expect(element).toHaveClass(style["size-lg"]);
    expect(element).toHaveClass(style["weight-bold"]);
    expect(element).toHaveClass(style["color-secondary"]);
  });
});
