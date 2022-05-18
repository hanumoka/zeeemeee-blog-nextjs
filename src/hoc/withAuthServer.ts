import UserApi from '../api/UserApi';
import { AUTH_URL } from '../data/constData';

export function withAuthServer(gssp) {
  console.log('withAuthServer start...');
  return async (context) => {
    console.log('withAuthServer start2...');
    const cookie = context.req ? context.req.headers.cookie : '';
    const url = context.resolvedUrl;

    // console.log('withAuthServer start...');
    // console.log('cookie:', cookie);
    // console.log('url:', url);

    try {
      // 서버사이드 렌더링으로 로그인 체크요청
      const response = await UserApi.checkLoginForServerStore(cookie);

      const { username, nickname, profileImageUri, sebureUri } = await response?.data;
      console.log('로그인 체크 성공');
      const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data
      return {
        props: {
          pageProps: gsspData.props,
          loginInfo: {
            username: username,
            nickname: nickname,
            profileImageUri: profileImageUri,
            sebureUri: sebureUri,
          },
        },
      };
    } catch (error) {
      console.log('로그인 체크 실패 url:', url);
      // console.error(error);
      // 로그인 필요한 URL 검사 후 redirect 처리
      for (const index in AUTH_URL) {
        if (url.startsWith(AUTH_URL[index])) {
          console.log('로그인이 필요한 URL 확인 -> redirect index');
          return {
            redirect: {
              permanent: false,
              destination: '/',
            },
            props: {
              loginInfo: { username: '', nickname: '', profileImageUri: '', sebureUri: '' },
            },
          };
        }
      }
      console.log('비로그인 접근 가능 URL 확인');
      return {
        props: { loginInfo: { username: '', nickname: '', profileImageUri: '', sebureUri: '' } },
      };
    }
  };
}
