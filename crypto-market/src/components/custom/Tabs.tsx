"use client";

import { ReactNode } from "react";
import Text from "./Text";
import { Tabs as TabsUI, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";

export interface ITabs {
  defaultValue?: string;
  tabsValue?: {
    value: string;
    label: string;
  }[]
}

export default function Button({
  defaultValue,
  tabsValue = [],
}: ITabs) {

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TabsUI defaultValue={defaultValue}>
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