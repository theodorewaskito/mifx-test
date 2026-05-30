"use client";

import { ReactNode } from "react";
import Text from "../common/Text";
import { Tabs as TabsUI, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";

export interface ITabs {
  defaultValue?: string;
  tabsValue?: {
    value: string;
    label: string;
  }[]
  onValueChange?: (value: string) => void;
}

export default function Button({
  defaultValue,
  tabsValue = [],
  onValueChange,
}: ITabs) {

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TabsUI defaultValue={defaultValue} onValueChange={onValueChange}>
        <TabsList variant="line">
          {
            tabsValue.map((tabsValue) => (
              <TabsTrigger 
                key={tabsValue.value} 
                value={tabsValue.value}
              >
                <Text
                  type="Label"
                  variant="Large"
                >{tabsValue.label}</Text>
              </TabsTrigger>
            ))
          }
        </TabsList>
      </TabsUI>

      <Separator />
    </div>
  );
}