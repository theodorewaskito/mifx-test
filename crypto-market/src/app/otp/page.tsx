import Text from "@/components/common/Text";
import BannerImage from "@/components/auth/otp/OtpBanner";
import FormOtp from "@/components/auth/otp/OtpForm";

export default function Otp() {

  return (
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="relative">
        <BannerImage/>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Text
            type="Header"
            variant="Large"
          >
            Confirm your phone
          </Text>
          <Text
            type="Body"
            variant="Medium"
          >
            We send 6 digits code to +8 888 670 99 02
          </Text>
        </div>
        <FormOtp />
      </div>
    </div>
  );
}
