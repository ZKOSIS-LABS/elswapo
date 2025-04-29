// WalletProvider.tsx
import { useSyncWagmiConfig } from '@lifi/wallet-management';
import { useAvailableChains } from '@lifi/widget';
import { injected, walletConnect } from '@wagmi/connectors';
import { FC, PropsWithChildren, useRef } from 'react';
import { http, createClient } from 'viem';
import { mainnet } from 'viem/chains';
import type { Config } from 'wagmi';
import { WagmiProvider, createConfig } from 'wagmi';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// Setup connectors using injected wallet and WalletConnect
const connectors = [injected(), walletConnect({ projectId })];

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const { chains } = useAvailableChains();
  // Allow the ref to be null initially
  const wagmi = useRef<Config | null>(null);

  // Initialize the wagmi config if not already set
  if (!wagmi.current) {
    wagmi.current = createConfig({
      chains: [mainnet],
      client({ chain }) {
        return createClient({ chain, transport: http() });
      },
      ssr: true,
    });
  }

  // Use non-null assertion here since wagmi.current is now initialized
  useSyncWagmiConfig(wagmi.current!, connectors, chains);

  return (
    <WagmiProvider config={wagmi.current!} reconnectOnMount={false}>
      {children}
    </WagmiProvider>
  );
};
