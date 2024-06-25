"use client";

import * as React from "react";
import { wagmiConfig } from "./wagmiConfig";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
// import {
//   argentWallet,
//   trustWallet,
//   ledgerWallet,
// } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { sepolia } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [
//     sepolia,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
//   ],
//   [
//     alchemyProvider({ apiKey: String(process.env.SEPOLIA_RPC_URL) }),
//     publicProvider(),
//   ]
// );

// const projectId = "cabb422807ebb8ba4cf2ddd072aaa2f2";

// const { wallets } = getDefaultWallets({
//   appName: "RainbowKit demo",
//   projectId,
//   chains,
// });

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

// const connectors = connectorsForWallets([
//   ...wallets,
//   {
//     groupName: "Other",
//     wallets: [
//       trustWallet({ projectId, chains }),
//       ledgerWallet({ projectId, chains }),
//     ],
//   },
// ]);

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
//   webSocketPublicClient,
// });

// // const wagmiConfig = createConfig({
// //   autoConnect: true,
// //   connectors: [
// //     new MetaMaskConnector({ chains }),
// //     new CoinbaseWalletConnector({
// //       chains,
// //       options: {
// //         appName: "wagmi",
// //       },
// //     }),

// //     new InjectedConnector({
// //       chains,
// //       options: {
// //         name: "Injected",
// //         shimDisconnect: true,
// //       },
// //     }),
// //   ],
// //   publicClient,
// //   webSocketPublicClient,
// // });

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
