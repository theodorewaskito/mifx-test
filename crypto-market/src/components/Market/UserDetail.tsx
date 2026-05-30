"use client"

import Text from "@/components/common/Text";
import Image from "next/image";
import { LogOut } from 'lucide-react';
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip" 
import { clearAuthCookies } from "@/lib/cookies";

export default function UserDetail() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthCookies();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center">
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
      <div
        className="mr-10"
        onClick={handleLogout}
      >
        <Tooltip>
          <TooltipTrigger>
            <LogOut className="cursor-pointer text-red-500" />
          </TooltipTrigger>
          <TooltipContent>
            Sign Out
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
