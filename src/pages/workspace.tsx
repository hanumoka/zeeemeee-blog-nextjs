import React from 'react';
import { withAuthServer } from '../hoc/withAuthServer';

const Workspace = ({ loginInfo, pageProps }) => {
  return <div>워크스페이스</div>;
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('workspace getServerSideProps ...');
  return { props: { test: 'workspace 서버 응답' } };
});

export default Workspace;
