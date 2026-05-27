import { ReactNode } from "react";
import Text from "./Text";

export interface IButton {
  children: ReactNode | string;
  className?: string;
}

export default function Button({
  className = "",
  children,
}: IButton) {

  return (
    <button className={`cursor-pointer bg-[#613DE4] hover:bg-[#461BE0] active:bg-[#2b0a96] text-white py-2 px-4 rounded w-full ${className}`}>
      <Text
        type="Title"
        variant="Medium"
      >{children}</Text>
    </button>
  );
}