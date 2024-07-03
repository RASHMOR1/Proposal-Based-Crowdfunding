import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  trustWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
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

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ chains, projectId }),
      rainbowWallet({ chains, projectId }),
      zerionWallet({ chains, projectId }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      trustWallet({ chains, projectId }),
      ledgerWallet({ chains, projectId }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
