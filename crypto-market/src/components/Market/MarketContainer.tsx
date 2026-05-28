import { Separator } from "@/components/ui/separator";
import UserDetail from "./UserDetail";
import MarketDetail from "./MarketDetail";

export default function DetailMarket() {

  return (
    <div className="flex flex-col gap-4 w-full mt-10">
      <UserDetail />
      <Separator />
      <MarketDetail />
    </div>
  );
}
