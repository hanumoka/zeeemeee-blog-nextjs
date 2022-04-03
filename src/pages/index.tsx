import React, { useEffect } from 'react';
import Head from 'next/head';
import loginStore from '../stores/loginStore';
export { getServerSideProps } from '../stores/globalStore'; // TODO: 기묘하도다

const Home = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  const { username, nickname } = loginStore((state) => state);

  useEffect(() => {
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);

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

export default Home;
