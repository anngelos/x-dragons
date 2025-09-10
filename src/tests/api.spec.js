import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../services/api.js";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("API Functions", () => {
  function mockFetch({ ok = true, status = 200, data = {} } = {}) {
    return vi.spyOn(global, "fetch").mockResolvedValue({
      ok,
      status,
      text: async () => (typeof data === "string" ? data : JSON.stringify(data)),
    });
  }

  describe("handleResponse", () => {
    it("should throw an error if res.ok is false", async () => {
      const res = { ok: false, status: 500, text: async () => "" };
      await expect(api.handleResponse(res)).rejects.toThrow("Erro na requisição: 500");
    });

    it("should return null if res.text() is empty", async () => {
      const res = { ok: true, text: async () => "" };
      const result = await api.handleResponse(res);
      expect(result).toBeNull();
    });

    it("should return a JSON object if res.text() contains JSON", async () => {
      const res = { ok: true, text: async () => '{"id":1}' };
      const result = await api.handleResponse(res);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe("getDragons", () => {
    it("should return dragons when fetch is successful", async () => {
      mockFetch({ data: [{ id: "1" }] });
      const result = await api.getDragons();
      expect(result).toEqual([{ id: "1" }]);
    });

    it("should return [] in case of a request error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Falha"));
      const result = await api.getDragons();
      expect(result).toEqual([]);
    });

    it("should return [] if response.text() is empty", async () => {
      mockFetch({ data: "" });
      const result = await api.getDragons();
      expect(result).toEqual([]);
    });
  });

  describe("deleteDragon", () => {
    it("should delete and return data", async () => {
      mockFetch({ data: { id: "1" } });
      const result = await api.deleteDragon("1");
      expect(result).toEqual({ id: "1" });
    });

    it("should return null if fetch fails", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Falha"));
      const result = await api.deleteDragon("1");
      expect(result).toBeNull();
    });

    it("should throw an error if res.ok is false", async () => {
      mockFetch({ ok: false, status: 404, data: "" });
      const result = await api.deleteDragon("1");
      expect(result).toBeNull();
    });
  });

  describe("createDragon", () => {
    it("should successfully create dragon", async () => {
      mockFetch({ data: { id: "1", name: "Draco" } });
      const result = await api.createDragon({ name: "Draco" });
      expect(result).toEqual({ id: "1", name: "Draco" });
    });

    it("should return null if res.ok is false", async () => {
      mockFetch({ ok: false, status: 500, data: "" });
      const result = await api.createDragon({ name: "Draco" });
      expect(result).toBeNull();
    });

    it("should return null if the response is not JSON", async () => {
      mockFetch({ data: "não é JSON" });
      const result = await api.createDragon({ name: "Draco" });
      expect(result).toBeNull();
    });
  });

  describe("getDragonById", () => {
    it("should return existing dragon", async () => {
      mockFetch({ data: { id: "1", name: "Draco" } });
      const result = await api.getDragonById("1");
      expect(result).toEqual({ id: "1", name: "Draco" });
    });

    it("should return null if res.ok is false", async () => {
      mockFetch({ ok: false, status: 404, data: "" });
      const result = await api.getDragonById("1");
      expect(result).toBeNull();
    });

    it("should return null if response is not JSON", async () => {
      mockFetch({ data: "não é JSON" });
      const result = await api.getDragonById("1");
      expect(result).toBeNull();
    });
  });

  describe("editDragon", () => {
    it("should successfully edit dragon", async () => {
      mockFetch({ data: { id: "1", name: "NovoNome" } });
      const result = await api.editDragon("1", { name: "NovoNome" });
      expect(result).toEqual({ id: "1", name: "NovoNome" });
    });

    it("should return null if res.ok is false", async () => {
      mockFetch({ ok: false, status: 500, data: "" });
      const result = await api.editDragon("1", { name: "NovoNome" });
      expect(result).toBeNull();
    });

    it("should return null if the response is not JSON", async () => {
      mockFetch({ data: "não é JSON" });
      const result = await api.editDragon("1", { name: "NovoNome" });
      expect(result).toBeNull();
    });
  });
});
