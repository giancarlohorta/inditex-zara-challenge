import { describe, it, expect } from "vitest";
import { formatText, humanizeKey, formatSpecList } from "./index";

import { mockProductDetailsData } from "../mocks/productDetails";

describe("formatText", () => {
  it("should convert text to uppercase", () => {
    expect(formatText("hello")).toBe("HELLO");
    expect(formatText("HeLLo")).toBe("HELLO");
    expect(formatText("123abc")).toBe("123ABC");
  });
});

describe("humanizeKey", () => {
  it("should insert spaces before uppercase letters and return uppercase string", () => {
    expect(humanizeKey("screenSize")).toBe("SCREEN SIZE");
    expect(humanizeKey("mainCamera")).toBe("MAIN CAMERA");
    expect(humanizeKey("processor")).toBe("PROCESSOR");
  });
});

describe("formatSpecList", () => {
  it("should merge brand, name, description with specs", () => {
    const result = formatSpecList(mockProductDetailsData);

    expect(result).toEqual({
      brand: "TestBrand",
      name: "Phone Test",
      mainCamera: "50MP",
      description: "Mock description",
      screen: "6.7 inch OLED",
      resolution: "2400x1080",
      processor: "Snapdragon 888",
      battery: "5000mAh",
      os: "Android 12",
      screenRefreshRate: "120Hz",
      selfieCamera: "32MP",
    });

    expect(Object.keys(result)).toHaveLength(
      3 + Object.keys(mockProductDetailsData.specs).length
    );
  });
});
