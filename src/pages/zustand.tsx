import React, { useEffect } from 'react';
import People from '../lib/samples/People';
import PeopleInput from '../lib/samples/PeopleInput';
import loginStore from '../stores/loginStore';
export { getServerSideProps } from '../stores/serverStore'; // TODO: 기묘하도다

const Zustand = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  useEffect(() => {
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);
  return (
    <div>
      <PeopleInput />
      <People />
    </div>
  );
};

export default Zustand;
