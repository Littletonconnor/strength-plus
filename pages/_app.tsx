import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <Component {...restPageProps} />
    </SessionProvider>
  );
}

export default MyApp;
