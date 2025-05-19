import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { httpClient } from "../utils/httpClient";

type Params = object;
type Payload = object;

interface ResourceState {
  // dữ liệu, loading, error theo từng "key"
  resources: Record<string, unknown>;
  loading: Record<string, boolean>;
  error: Record<string, string | null>;

  // actions
    fetchResource: (key: string, url: string, params?: Params) => Promise<void>;
  createResource: (key: string, url: string, data: Payload) => Promise<void>;
  updateResource: (key: string, url: string, data: Payload) => Promise<void>;
  patchResource: (key: string, url: string, data: Payload) => Promise<void>;
  deleteResource: (key: string, url: string, params?: Params) => Promise<void>;

  clearResource: (key: string) => void;
  clearAll: () => void;
}

export const useResourceStore = create<ResourceState>()(
  devtools((set) => ({
    resources: {},
    loading: {},
    error: {},

    // GET
    fetchResource: async (key, url, params = {}) => {
      set((state) => ({
        loading: { ...state.loading, [key]: true },
        error: { ...state.error, [key]: null },
      }));
      try {
        const data = await httpClient.get({ url, params });
        set((state) => ({
          resources: { ...state.resources, [key]: data },
          loading: { ...state.loading, [key]: false },
        }));
      } catch (err: unknown) {
        const message = (err as { message?: string })?.message || "Error";
        set((state) => ({
          error: { ...state.error, [key]: message || "Error" },
          loading: { ...state.loading, [key]: false },
        }));
      }
    },

    // POST
    createResource: async (key, url, data) => {
      set((state) => ({
        loading: { ...state.loading, [key]: true },
        error: { ...state.error, [key]: null },
      }));
      try {
        const res = await httpClient.post({ url, data });
        set((state) => ({
          resources: { ...state.resources, [key]: res },
          loading: { ...state.loading, [key]: false },
        }));
      } catch (err: unknown) {
        const message = (err as { message?: string })?.message || "Error";
        set((state) => ({
          error: { ...state.error, [key]: message || "Error" },
          loading: { ...state.loading, [key]: false },
        }));
      }
    },

    // PUT
    updateResource: async (key, url, data) => {
      set((state) => ({
        loading: { ...state.loading, [key]: true },
        error: { ...state.error, [key]: null },
      }));
      try {
        const res = await httpClient.put({ url, data });
        set((state) => ({
          resources: { ...state.resources, [key]: res },
          loading: { ...state.loading, [key]: false },
        }));
      } catch (err: unknown) {
        const message = (err as { message?: string })?.message || "Error";
        set((state) => ({
          error: { ...state.error, [key]: message || "Error" },
          loading: { ...state.loading, [key]: false },
        }));
      }
    },

    // PATCH
    patchResource: async (key, url, data) => {
      set((state) => ({
        loading: { ...state.loading, [key]: true },
        error: { ...state.error, [key]: null },
      }));
      try {
        const res = await httpClient.post({
          url,
          data,
          options: { method: "PATCH" },
        });
        set((state) => ({
          resources: { ...state.resources, [key]: res },
          loading: { ...state.loading, [key]: false },
        }));
      } catch (err: unknown) {
        const message = (err as { message?: string })?.message || "Error";
        set((state) => ({
          error: { ...state.error, [key]: message || "Error" },
          loading: { ...state.loading, [key]: false },
        }));
      }
    },

    // DELETE
    deleteResource: async (key, url, params = {}) => {
      set((state) => ({
        loading: { ...state.loading, [key]: true },
        error: { ...state.error, [key]: null },
      }));
      try {
        const res = await httpClient.deleteData({ url, params });
        set((state) => ({
          resources: { ...state.resources, [key]: res },
          loading: { ...state.loading, [key]: false },
        }));
      } catch (err: unknown) {
        const message = (err as { message?: string })?.message || "Error";
        set((state) => ({
          error: { ...state.error, [key]: message },
          loading: { ...state.loading, [key]: false },
        }));
      }
    },

    // Clear một key
    clearResource: (key) =>
      set((state) => ({
        resources: { ...state.resources, [key]: null },
        loading: { ...state.loading, [key]: false },
        error: { ...state.error, [key]: null },
      })),

    // Reset toàn bộ
    clearAll: () =>
      set({
        resources: {},
        loading: {},
        error: {},
      }),
  }))
);
