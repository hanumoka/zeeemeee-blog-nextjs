import React, { useEffect } from 'react';
import People from '../lib/components/samples/People';
import PeopleInput from '../lib/components/samples/PeopleInput';
import loginStore from '../stores/loginStore';
export { getServerSideProps } from '../stores/globalStore'; // TODO: 기묘하도다

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
