import Text from "../common/Text";
import Input from "../form/Input";
import Tabs from "../common/Tabs";
import { Search } from 'lucide-react';
import MarketCard from "./MarketCard";

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

export default function Sidebar() {

  return (
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
  );
}
