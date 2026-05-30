"use client"

import Text from "@/components/common/Text";
import { useMarketStore } from "@/store/market.store";
import Image from "next/image";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";

const dataDummy = [ 
  { 
    "id": "bitcoin", 
    "name": "Bitcoin", 
    "symbol": "BITC", 
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", 
    "price_idr": "IDR 1.301.632.806,00", 
    "change_percent": "-4,04%", 
    "isPositive": false, 
    "hot": false, 
    "isFavorite": true, 
    "type": "cryptocurrency" 
  } 
] 

export default function MarketDetail() {
  const {
    isLoading,
    selectedCrypto,
  } = useMarketStore();

  console.log('select', selectedCrypto);

  const [imageSrc, setImageSrc] = useState<string>(selectedCrypto?.image || "");

  useEffect(() => {
    if (selectedCrypto?.image) {
      setImageSrc(selectedCrypto.image);
    } else {
      setImageSrc("/dummy-crypto.png");
    }
  }, [selectedCrypto]); 

  return (
    <div className="flex flex-col gap-4">
      <Text
        type="Header"
        variant="Small"
      >
        Welcome to Trading Dashboard
      </Text>
      {
        !isLoading ? (
          <div className="flex gap-2 items-center">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="Market Brand"
                width={40}
                height={40}
                // onError={() => setImageSrc("/dummy-crypto.png")}
              />
            )}
            <Text 
              type="Header"
              variant="Small"
            >
              {selectedCrypto?.symbol ?? ""} {selectedCrypto?.symbol ? "/ IDR" : ""}
            </Text>
            <div className={selectedCrypto?.isPositive ? "text-[#3BB266]" : "text-[#FF4D4F]"}>
              <Text 
                type="Body"
                variant="Large"
              >
                {selectedCrypto?.price_idr?.replace("IDR ", "") ?? ""}
              </Text>
              <Text 
                type="Body"
                variant="Large"
              >
                {selectedCrypto?.change_percent ?? ""}
              </Text>
            </div>
          </div>
        ) : (
          <Spinner className="size-20" />
        )
      }

    </div>
  );
}
