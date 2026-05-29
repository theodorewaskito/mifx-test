import Image from "next/image";

export default function BannerImage({loginMode}: {loginMode: "email" | "phone"}) {

  return (
    <div className="relative w-full h-full z-10">
      <Image
        src={loginMode === "phone" ? "/left-content-login-phone.jpg" : "/left-content-login.jpg"}
        alt="Banner Login"
        fill
        className="object-cover"
      />
    </div>
  );
}
