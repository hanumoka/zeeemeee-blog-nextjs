import loginStore from './loginStore';
import { GetServerSideProps } from 'next';

// export async function getServerSideProps(context) {
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  try {
    const { username, nickname } = await loginStore.getState().loginCheckServerFetch(cookie || '');
    return {
      props: {
        loginInfo: {
          username: username,
          nickname: nickname,
        },
      },
    };
  } catch (error) {
    console.log('비 로그인 상태');
    console.error(error);
    return { props: { loginInfo: { username: '', nickname: '' } } };
  }
};
