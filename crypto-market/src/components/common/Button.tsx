import { ReactNode } from "react";
import Text from "@/components/common/Text";
import { Button as ButtonUI } from "@/components/ui/button"

interface IButton extends React.ComponentPropsWithoutRef<typeof ButtonUI> {
  children: ReactNode | string;
}

export default function Button({
  type = "button",
  className = "",
  children,
  ...props
}: IButton) {

  return (
    <ButtonUI 
      type={type} 
      className={`w-full ${className}`}
      {...props}
    >
      <Text
        type="Title"
        variant="Medium"
      >{children}</Text>
    </ButtonUI>
  );
}