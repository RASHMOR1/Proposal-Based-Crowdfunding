import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "@wagmi/core/providers/infura";

const newLocal = { retryDelay: 0 };
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    sepolia,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  [
    // alchemyProvider({
    //   apiKey:
    //     "https://eth-sepolia.g.alchemy.com/v2/kMcDfQF9HUZ9N4RDi7aIDsmlEpSopJaR",
    // }),
    // infuraProvider({
    //   apiKey: "https://sepolia.infura.io/v3/6649fb1c45044a0f90e70b290c85b3ce",
    // }),
    publicProvider(),
  ]
  //{ retryDelay: 5000 }
);

const projectId = "cabb422807ebb8ba4cf2ddd072aaa2f2";

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
