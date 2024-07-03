import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { InjectedConnector } from "@wagmi/core";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";

import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],

  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL as string,
      }),
    }),
  ]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

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

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  // webSocketPublicClient,
});
