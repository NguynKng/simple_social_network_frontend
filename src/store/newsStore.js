import { create } from "zustand";
import { newsApi } from "../services/newsApi";

const useNewsStore = create((set, get) => ({
    news: [],
    loading: false,
    fetchNews: async () => {
        set({ loading: true });
        if (get().news.length > 0) {
            set({ loading: false });
            return;
        }
        try {
            const response = await newsApi.fetchNews();
            if (response.success) {
                set({ news: response.data });
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            set({ loading: false });
        }
    }
}));

export default useNewsStore;