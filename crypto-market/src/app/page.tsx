import { redirect } from 'next/navigation'
import { getAuthToken, getLoginOtp } from '@/lib/cookies.server'
import Sidebar from "@/components/market/MarketSidebar";
import MarketContainer from "@/components/market/MarketContainer";

export default async function market() {
  const token = await getAuthToken()
  const loginOtp = await getLoginOtp()

  if (!token) {
    redirect('/login')
  }

  if (!loginOtp) {
    redirect('/otp')
  }

  return (
    <div className="flex h-screen gap-4">
      <Sidebar />
      <MarketContainer />
    </div>
  );
}
