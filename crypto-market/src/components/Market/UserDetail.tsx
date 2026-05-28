import Text from "@/components/common/Text";
import Image from "next/image";

export default function UserDetail() {

  return (
    <div className="flex gap-3 items-center">
      <Image
        src="/avatar.jpg"
        alt="Market Brand"
        width={40}
        height={40}
      />
      <Text
        type="Header"
        variant="Large"
      >
        John Johnson
      </Text>
    </div>
  );
}
