import { ReactNode } from "react";

export interface IText {
  children: ReactNode | string;
  variant?: "Large" | "Medium" | "Small";
  type?: "Header" | "Title" | "Label" | "Body";
  className?: string;
}

const styleText = {
  Header: {
    Large: "text-[32px] font-semibold leading-[40px]",
    Medium: "text-base font-medium leading-[20px]",
    Small: "text-2xl font-medium leading-[32px]",
  },
  Title: {
    Large: "text-[20px] font-medium leading-[24px]",
    Medium: "",
    Small: "",
  },
  Label: {
    Large: "text-sm font-medium leading-[20px]",
    Medium: "",
    Small: "",
  },
  Body: {
    Large: "",
    Medium: "text-sm font-normal leading-[20px]",
    Small: "text-xs font-normal leading-[16px]",
  },
} as const;

export default function Text({
  type = "Body",
  variant = "Medium",
  children,
  className = "",
}: IText) {
  const selectedStyle = styleText[type];

  return (
    <p
      className={`
        ${selectedStyle[variant]}
        ${className}
      `}
    >
      {children}
    </p>
  );
}