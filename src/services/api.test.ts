import { describe, it, expect, beforeEach } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { api } from "./api";

describe("axios instance (api)", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
    mock.reset();
  });

  it("should have correct baseURL", () => {
    expect(api.defaults.baseURL).toBe(
      "https://prueba-tecnica-api-tienda-moviles.onrender.com/"
    );
  });

  it("should have x-api-key header", () => {
    expect(api.defaults.headers["x-api-key"]).toBe(
      "87909682e6cd74208f41a6ef39fe4191"
    );
  });

  it("should perform a mocked GET request", async () => {
    const mockData = { message: "success" };
    mock.onGet("/test").reply(200, mockData);

    const response = await api.get("/test");

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData);
  });

  it("should handle error response", async () => {
    mock.onGet("/error").reply(500);

    try {
      await api.get("/error");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });
});
