import { GetServerSideProps } from 'next';
import axios from 'axios';

// export async function getServerSideProps(context) {
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  const url = context.resolvedUrl;

  try {
    console.log('서버 렌더링 요청 시작...');
    const response = await axios.post('http://localhost:8080/api/logininfo', null, {
      withCredentials: true,
      headers: {
        Cookie: cookie || '',
      },
    });

    const { username, nickname } = response?.data;
    console.log('서버 렌더링 요청 성공...');
    // const { username, nickname } = await loginStore.getState().loginCheckServerFetch(cookie || '');
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

    if (url === '/write') {
      // 로그인이 필요한 페이지
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: { loginInfo: { username: '', nickname: '' } },
      };
    }

    return { props: { loginInfo: { username: '', nickname: '' } } };
  }
};
