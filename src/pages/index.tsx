import React from 'react';
import Head from 'next/head';
import loginStore from '../stores/loginStore';
import { withAuthServer } from '../hoc/withAuthServer';

const Home = ({ loginInfo, pageProps }) => {
  const { username, nickname } = loginStore((state) => state);
  return (
    <>
      <Head>
        <title>Sebure/home</title>
      </Head>
      <div>Sebure Home Page</div>
      <div>username: {username}</div>
      <div>nickname: {nickname}</div>
    </>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('index getServerSideProps ...');
  return { props: { test: 'index 서버 응답' } };
});

export default Home;
