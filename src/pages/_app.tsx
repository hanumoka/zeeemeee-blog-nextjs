import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import defaultSEOConfig from '../../next-seo.config';
import Layout from 'lib/components/layout';
import customTheme from 'lib/styles/customTheme';
import 'lib/styles/globals.css';
import { useEffect } from 'react';
import loginStore from '../stores/loginStore';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const { loginInfo } = pageProps;

    if (loginInfo) {
      loginStore
        .getState()
        .setLoginInfo(loginInfo.username, loginInfo.nickname, loginInfo.profileImageUri);
    }
  }, [pageProps]);

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Sebure</title>
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
