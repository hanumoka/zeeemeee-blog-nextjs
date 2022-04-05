import React, { useEffect } from 'react';
import loginStore from '../stores/loginStore';
import CustomEditor from '../lib/components/editor/CustomEditor';

export { getServerSideProps } from '../stores/globalStore'; // TODO: 기묘하도다

const Write = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  useEffect(() => {
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);

  return (
    <>
      <CustomEditor />
    </>
  );
};

export default Write;
