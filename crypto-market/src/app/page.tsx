import Sidebar from "@/components/market/MarketSidebar";
import MarketContainer from "@/components/market/MarketContainer";

export default function market() {

  return (
    <div className="flex h-screen gap-4">
      <Sidebar />
      <MarketContainer />
    </div>
  );
}
