"use client"

import Text from "@/components/common/Text";
import Image from "next/image";
import { LogOut } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip" 
import { STORAGE_KEYS } from "@/constants/storage-key";
export default function UserDetail() {

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
      <button
        className="mr-10"
        onClick={() => {
          localStorage.clear()
        }}
      >
        <Tooltip>
          <TooltipTrigger>
            <LogOut className="cursor-pointer text-red-500" />
          </TooltipTrigger>
          <TooltipContent>
            Sign Out
          </TooltipContent>
        </Tooltip>
      </button>
    </div>
  );
}
