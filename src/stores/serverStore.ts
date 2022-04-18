import { GetServerSideProps } from 'next';
import UserApi from '../api/UserApi';
import { AUTH_URL } from '../data/constData';

/*
 * Next.js ---REQ--> SpringBoot
 * 페이지 마다 공통으로 요청하는 ServerSideProps
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const url = context.resolvedUrl;

  try {
    console.log('서버 렌더링 요청 시작...');
    // 서버사이드 렌더링으로 로그인 체크요청
    const response = await UserApi.checkLoginForServerStore(cookie);

    const { username, nickname } = response?.data;
    console.log('서버 렌더링 요청 성공...');
    return {
      props: {
        loginInfo: {
          username: username,
          nickname: nickname,
        },
      },
    };
  } catch (error) {
    console.log('비 로그인 상태 url:', url);

    // TODO: 로그인 체크할 페이지 정보등을 별도 파일로 분리하자.
    for (const index in AUTH_URL) {
      if (url === AUTH_URL[index]) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
          props: { loginInfo: { username: '', nickname: '' } },
        };
      }
    }

    return { props: { loginInfo: { username: '', nickname: '' } } };
  }
};
