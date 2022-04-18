import React from 'react';
import { withAuthServer } from '../hoc/withAuthServer';

const About = () => {
  return <div>About 페이지</div>;
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('about getServerSideProps ...');
  return { props: { test: 'about 서버 응답' } };
});

export default About;
