import Text from "@/components/common/Text";
import Image from "next/image";

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

  return (
    <div className="flex flex-col gap-4">
      <Text
        type="Header"
        variant="Small"
      >
        Welcome to Trading Dashboard
      </Text>
      <div className="flex gap-2 items-center">
        <Image
          src={dataDummy[0].image}
          alt="Market Brand"
          width={40}
          height={40}
        />
        <Text 
          type="Header"
          variant="Small"
        >
          BTC/USDT
        </Text>
        <div className="text-[#3BB266]">
          <Text 
            type="Body"
            variant="Large"
          >
            36 453,9
          </Text>
          <Text 
            type="Body"
            variant="Large"
          >
            +3.12%
          </Text>
        </div>
      </div>
    </div>
  );
}
