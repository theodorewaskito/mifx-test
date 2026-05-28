import Image from "next/image";

export default function BannerImage() {

  return (
    <div className="relative w-full h-full">
      <Image
        src={"/left-content-otp.jpg"}
        alt="Banner OTP"
        fill
        className="object-cover"
      />
    </div>
  );
}
