import { create } from "zustand";

// Zustand keeps the dashboard's asynchronous data state in one small store.
// The data is fetched from our own public JSON file, so no external API key is needed.
const useDashboardStore = create((set) => ({
  overview: null,
  loading: false,
  error: "",
  lastLoadedAt: null,

  loadOverview: async () => {
    set({ loading: true, error: "" });

    try {
      const response = await fetch("/dashboard-data.json", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Dashboard data could not be loaded (HTTP ${response.status}).`);
      }

      const data = await response.json();
      if (!Array.isArray(data.stats) || !Array.isArray(data.features)) {
        throw new Error("Dashboard data has an unexpected format.");
      }

      set({
        overview: data,
        loading: false,
        error: "",
        lastLoadedAt: new Date().toISOString(),
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading the dashboard.",
      });
    }
  },
}));

export default useDashboardStore;
