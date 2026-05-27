import { ReactNode } from "react";
import Text from "./Text";
import { Button as ButtonUI } from "@/components/ui/button"

interface IButton {
  type?: "button" | "submit" | "reset";
  children: ReactNode | string;
  className?: string;
}

export default function Button({
  type = "button",
  className = "",
  children,
}: IButton) {

  return (
    <ButtonUI 
      type={type} 
      className={`w-full ${className}`}
    >
      <Text
        type="Title"
        variant="Medium"
      >{children}</Text>
    </ButtonUI>
  );
}