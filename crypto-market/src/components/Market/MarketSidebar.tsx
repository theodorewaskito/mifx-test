"use client"

import Text from "../common/Text";
import Input from "../form/Input";
import Tabs from "../common/Tabs";
import { Search } from 'lucide-react';
import MarketCard from "./MarketCard";
import { useEffect, useState } from "react";
import { useMarketStore, useFilteredList } from "@/store/market.store";
import { Spinner } from "../ui/spinner"
import { CryptoItem } from "@/types/index";

const tabsValue = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "cryptocurrency",
    label: "Cryptocurrency",
  },
  {
    value: "favorite",
    label: "Favorite",
  },
]

export default function Sidebar() {
  const {
    isLoading,
    selectedCrypto,
    searchQuery,
    activeTab,
    fetchCryptoList,
    setSelectedCrypto,
    setSearchQuery,
    setActiveTab,
  } = useMarketStore();

  useEffect(() => {
    fetchCryptoList();
  }, []);

  const list = useFilteredList();

  const [localQuery, setLocalQuery] = useState<string>(searchQuery);

  useEffect(() => {
    if (list && list.length > 0) {
      setSelectedCrypto(list[0]);
    } else {
      setSelectedCrypto({} as CryptoItem);
    }
    setLocalQuery("");
  }, [activeTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [localQuery]);

  return (
    <div className="min-w-94.75 bg-[#F5F5F5] h-full">
      <div className="flex flex-col p-4 gap-2">
        <Text
          type="Title"
          variant="Large"
        >
          Markets
        </Text>
        <Input
          id="password"
          type={"text"}
          placeholder="Search"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          trailingIcon={
            <button>
              <Search />
            </button>
          }
        />
      </div>

      <div className="flex flex-col gap-4 px-4">

        <Tabs 
          defaultValue={activeTab}
          tabsValue={tabsValue}
          onValueChange={(val) => setActiveTab(val as any)} 
        />

        <div className="overflow-y-auto h-[calc(100vh-170px)] flex flex-col gap-3">
        {
          isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner className="size-20"/>
            </div>
          ) : (
            <>
              {
                list && list.length > 0 ? (
                  list.map((item) => (
                    <MarketCard
                      key={item.id}
                      data={item}
                      chosen={selectedCrypto?.id === item.id}
                      onSelect={() => setSelectedCrypto(item)}
                    />
                  ))
                ) : (
                  (searchQuery?.trim() ? (
                    <div className="p-6 text-center text-sm text-[#666]">
                      {`We couldn’t find ‘${searchQuery}.’ Try searching with a different keyword.`}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-[#666]">
                      No markets found.
                    </div>
                  ))
                )
              }
            </>
          )
        }
        </div>

      </div>

    </div>
  );
}
