import React, { useEffect } from 'react';
import loginStore from '../stores/loginStore';
export { getServerSideProps } from '../stores/serverStore';

const Workspace = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  useEffect(() => {
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);
  return <div>워크스페이스</div>;
};

export default Workspace;
