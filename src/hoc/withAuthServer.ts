import UserApi from '../api/UserApi';
import { AUTH_URL } from '../data/constData';

export function withAuthServer(gssp) {
  return async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    const url = context.resolvedUrl;

    try {
      // 서버사이드 렌더링으로 로그인 체크요청
      const response = await UserApi.checkLoginForServerStore(cookie);

      console.log('withAuthServer -------');

      const temp = await response?.data;
      console.log(JSON.stringify(temp));

      const { username, nickname, profileImageUri } = await response?.data;
      console.log('로그인 체크 성공');
      const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data
      return {
        props: {
          pageProps: gsspData.props,
          loginInfo: {
            username: username,
            nickname: nickname,
            profileImageUri: profileImageUri,
          },
        },
      };
    } catch (error) {
      console.log('비 로그인 상태 url:', url);
      // 로그인 필요한 URL 검사 후 redirect 처리
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
}
