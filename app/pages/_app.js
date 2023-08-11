import { useState } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import ChainContext from '../context/chain';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.


function MyApp({ Component, pageProps }) {
	const [selectedChain, setSelectedChain] = useState("optimism");
	return (
		<ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
			<ThirdwebProvider
				activeChain={selectedChain}
				clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
			>
				<Component {...pageProps} />
			</ThirdwebProvider>
		</ChainContext.Provider>
	);
}

export default MyApp;
