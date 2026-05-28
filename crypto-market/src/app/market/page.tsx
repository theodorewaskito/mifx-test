import Sidebar from "@/components/Market/Sidebar";
import DetailMarket from "@/components/Market/DetailMarket";

export default function market() {

  return (
    <div className="flex h-screen gap-4">
      <Sidebar />
      <DetailMarket />
    </div>
  );
}
