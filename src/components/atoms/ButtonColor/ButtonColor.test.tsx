import { render, screen, fireEvent } from "@testing-library/react";
import ButtonColor from "./ButtonColor";
import { describe, it, expect, vi } from "vitest";

const onSelectedMock = vi.fn();

const mockColor = {
  name: "Red",
  hexCode: "#FF0000",
  imageUrl: "red.png",
};

const mockSelected = {
  name: "Red",
  hexCode: "#FF0000",
  imageUrl: "red.png",
};

describe("ButtonColor Component", () => {
  it("should render the button with correct aria-label", () => {
    render(
      <ButtonColor
        color={mockColor}
        selected={mockSelected}
        onSelected={onSelectedMock}
      />
    );

    const button = screen.getByRole("button", { name: /Red/i });
    expect(button).toBeInTheDocument();
  });

  it("should call onSelected with correct parameters when clicked", () => {
    render(
      <ButtonColor
        color={mockColor}
        selected={{ name: "Blue", hexCode: "#0000FF", imageUrl: "blue.png" }}
        onSelected={onSelectedMock}
      />
    );

    const button = screen.getByRole("button", { name: /Red/i });
    fireEvent.click(button);

    expect(onSelectedMock).toHaveBeenCalledWith({
      hexCode: "#FF0000",
      imageUrl: "red.png",
      colorName: "Red",
    });
  });

  it("should apply 'active' class when selected", () => {
    render(
      <ButtonColor
        color={mockColor}
        selected={mockSelected}
        onSelected={onSelectedMock}
      />
    );

    const button = screen.getByRole("button", { name: /Red/i });
    expect(button.className).toMatch(/active/);
  });

  it("should not apply 'active' class when not selected", () => {
    render(
      <ButtonColor
        color={mockColor}
        selected={{ name: "Blue", hexCode: "#0000FF", imageUrl: "blue.png" }}
        onSelected={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: /Red/i });
    expect(button.className).not.toMatch(/active/);
  });
});
