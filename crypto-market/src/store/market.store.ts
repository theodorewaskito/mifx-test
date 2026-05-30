import { create } from "zustand";
import { useMemo } from "react";
import { CryptoItem } from "@/types/index";
import { getClientCookie } from "@/lib/cookies";

type TabFilter = "all" | "cryptocurrency" | "favorite";

interface MarketState {
  cryptoList: CryptoItem[];
  isLoading: boolean;
  selectedCrypto: CryptoItem | null;
  searchQuery: string;
  activeTab: TabFilter;

  setCryptoList: (list: CryptoItem[]) => void;
  setLoading: (val: boolean) => void;
  setSelectedCrypto: (item: CryptoItem | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: TabFilter) => void;
  fetchCryptoList: () => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  cryptoList: [],
  isLoading: true,
  selectedCrypto: null,
  searchQuery: "",
  activeTab: "all",

  setCryptoList: (list) => set({ cryptoList: list }),
  setLoading: (val) => set({ isLoading: val }),
  setSelectedCrypto: (item) => set({ selectedCrypto: item }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveTab: (tab) =>
    set({
      activeTab: tab,
      searchQuery: "",
    }),

  fetchCryptoList: async () => {
    set({ isLoading: true });
    try {
      const token = getClientCookie("auth_token");
      const response = await fetch("/api/private/market", {
        headers: { Authorization: `${token}` },
      });
      const data = await response.json();

      if (data.data) {
        const list: CryptoItem[] = data.data;
        set({
          cryptoList: list,
          selectedCrypto: list[0] ?? null,
        });
      }
    } catch (error) {
      console.error("Failed to fetch market:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export function useFilteredList() {
  const cryptoList = useMarketStore((s) => s.cryptoList);
  const activeTab = useMarketStore((s) => s.activeTab);
  const searchQuery = useMarketStore((s) => s.searchQuery);

  return useMemo(() => {
    let list = cryptoList;

    if (activeTab === "cryptocurrency") {
      list = list.filter((item) => item.type === "cryptocurrency");
    } else if (activeTab === "favorite") {
      list = list.filter((item) => item.isFavorite === true);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((item) => {
        const name   = item.name?.toLowerCase()   ?? "";
        const symbol = item.symbol?.toLowerCase() ?? "";
        return name.includes(q) || symbol.includes(q);
      });
    }

    return list;
  }, [cryptoList, activeTab, searchQuery]);
}