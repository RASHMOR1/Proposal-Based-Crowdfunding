"use client";

import * as React from "react";
import { wagmiConfig } from "./wagmiConfig";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { WagmiConfig } from "wagmi";

const demoAppInfo = {
  appName: "Proposal Based Crowdfunding Platfrom",
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  const chains = wagmiConfig.chains || [];
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
