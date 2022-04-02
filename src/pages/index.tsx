import React from 'react';
import loginStore from '../stores/loginStore';
// import axios from 'axios';

const Home = () => {
  const { username, nickname } = loginStore((state) => state);
  return (
    <>
      <div>Sebure Home Page</div>
      <div>username: {username}</div>
      <div>nickname: {nickname}</div>
    </>
  );
};

// export async function getServerSideProps(context: any) {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   // axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     axios.defaults.headers = { ...axios.defaults.headers, Cookie: cookie };
//
//     try {
//       const loginCheckFetch = loginStore.getState().loginCheckFetch;
//       loginCheckFetch();
//       console.log('성공...');
//     } catch (error) {
//       console.log('비 로그인 상태');
//       console.error(error);
//     }
//   }
//
//   return { props: {} };
// }

/*export async function getServerSideProps(context: any) {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log('=== cookie ====');
  console.log(cookie);

  // const data = { username: '', nickname: '' };
  let username = '';
  let nickname = '';
  try {
    const response = await axios.post('http://localhost:8080/api/logininfo', null, {
      withCredentials: true,
      headers: {
        Cookie: cookie,
      },
    });
    console.log(JSON.stringify(response.data));
    // TODO: next.js => spring 요청을 zustand로 처리가 가능한가?
    username = response.data?.username;
    nickname = response.data?.nickname;
    console.log('username:', username);
    console.log('nickname:', nickname);
  } catch (error) {
    console.log('비 로그인 상태');
    console.error(error);
  }

  return { props: { loginInfo: { username, nickname } } };
}*/

export default Home;
