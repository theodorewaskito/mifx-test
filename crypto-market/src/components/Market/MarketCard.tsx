import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import Text from "../common/Text";

interface ICard {
  data: {
    "id": string, 
    "name": string, 
    "symbol": string, 
    "image": string, 
    "price_idr": string, 
    "change_percent": string, 
    "isPositive": boolean, 
    "hot": boolean, 
    "isFavorite": boolean, 
    "type": string 
  },
  chosen?: boolean,
}

export default function MarketCard({ data, chosen }: ICard) {

  return (
    <div 
      className={`cursor-pointer ${chosen ? "text-white bg-[#613DE4] hover:bg-[#4A2B9D]  active:bg-[#4A2B9D]" : "bg-[#D4D4D4] hover:bg-[#C4C4C4] active:bg-[#B4B4B4]"} rounded-sm flex p-4 gap-2 items-center`}
    >
      <Image
        src={data.image}
        alt="Market Brand"
        width={40}
        height={40}
      />
      <div className="flex justify-between w-full gap-2">
        <div className="flex flex-col justify-between">
          <Text
            type="Title"
            variant="Medium"
          >{data.symbol}</Text>
          <Text
            type="Body"
            variant="Medium"
          >{data.name}</Text>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={`rounded-xs ${data.isPositive ? "bg-[#F5F7FC]" : "bg-[#ffeeee]"}`}>
            <Text
              type="Label"
              variant="Large"
              className={data.isPositive ? "text-[#3BB266]" : "text-[#FF4D4F]"}
            >{data.change_percent}</Text>
          </Badge>
          <Text
            type="Title"
            variant="Small"
            className="break-all"
          >{data.price_idr}</Text>
        </div>
      </div>
    </div>
  );
}
