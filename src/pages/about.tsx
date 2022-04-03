import React, { useEffect } from 'react';
import loginStore from '../stores/loginStore';
export { getServerSideProps } from '../stores/globalStore'; // TODO: 기묘하도다

const About = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  useEffect(() => {
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);
  return <div>About 페이지</div>;
};

export default About;
