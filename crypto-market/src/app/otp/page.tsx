import { redirect } from 'next/navigation'
import { getAuthToken } from '@/lib/cookies.server'
import BannerImage from "@/components/auth/otp/OtpBanner";
import FormOtp from "@/components/auth/otp/OtpForm";

export default async function Otp() {
  const token = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  return (
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="relative">
        <BannerImage/>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <FormOtp />
      </div>
    </div>
  );
}
