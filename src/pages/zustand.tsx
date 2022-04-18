import React from 'react';
import People from '../lib/samples/People';
import PeopleInput from '../lib/samples/PeopleInput';
import { withAuthServer } from '../hoc/withAuthServer';

const Zustand = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  return (
    <div>
      <PeopleInput />
      <People />
    </div>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('Zustand getServerSideProps ...');
  return { props: { test: 'Zustand 서버 응답' } };
});

export default Zustand;
