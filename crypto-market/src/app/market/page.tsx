import Text from "@/components/custom/Text";
import Input from "@/components/custom/Input";
import { Search } from 'lucide-react';
import Tabs from "@/components/custom/Tabs";
import MarketCard from "@/components/Market/MarketCard";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

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

export default function market() {

  return (
    <div className="flex h-screen gap-4">
      <div className="w-94.75 bg-[#F5F5F5]">
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
            trailingIcon={
              <button
                type="submit"
                // onClick={() =)}
                className="flex items-center justify-center"
              >
                <Search />
              </button>
            }
          />
        </div>

        <div className="flex flex-col gap-4 px-4">

          <Tabs 
            defaultValue="cryptocurrency" 
            tabsValue={tabsValue} 
          />

          {
            dataDummy?.map((item) => (
              <MarketCard 
                key={item.id} 
                data={item} 
                // chosen={item.isFavorite} 
              />
            ))
          }

        </div>

      </div>

      <div className="flex flex-col gap-4 w-full mt-10">
        <div className="flex gap-3 items-center">
          <Image
            src="/avatar.jpg"
            alt="Market Brand"
            width={40}
            height={40}
          />
          <Text
            type="Header"
            variant="Large"
          >
            John Johnson
          </Text>
        </div>
        <Separator />
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
      </div>

    </div>
  );
}
