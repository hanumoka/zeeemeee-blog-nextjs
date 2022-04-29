import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import defaultSEOConfig from '../../next-seo.config';
import Layout from 'lib/components/layout';
import customTheme from 'lib/styles/customTheme';
import 'lib/styles/globals.css';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import loginStore from '../stores/loginStore';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  // if (ctx.res.statusCode === 404) {
  //   res.writeHead(301, { Location: '/' })
  //   res.end()
  // }

  useEffect(() => {
    const { loginInfo } = pageProps;

    if (loginInfo) {
      loginStore
        .getState()
        .setLoginInfo(
          loginInfo.username,
          loginInfo.nickname,
          loginInfo.profileImageUri,
          loginInfo.sebureUri
        );
    }
  }, [pageProps]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* devtools */}
      <ReactQueryDevtools initialIsOpen={true} />
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
    </QueryClientProvider>
  );
};

export default MyApp;
