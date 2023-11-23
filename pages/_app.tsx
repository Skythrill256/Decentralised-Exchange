import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider ,darkTheme} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  polygonMumbai,
  sepolia,
  avalanche,
  shibarium
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    polygonMumbai,
    sepolia,
    goerli,
    avalanche,
    shibarium,
    
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Decentralized Exchange',
  projectId: '8223e0251657e1aff1625a8f7042f661',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}  theme ={darkTheme()} >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
