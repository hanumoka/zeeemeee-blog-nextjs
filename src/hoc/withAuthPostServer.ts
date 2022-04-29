import UserApi from '../api/UserApi';

export function withAuthPostServer(gssp) {
  return async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    const url = context.resolvedUrl;

    try {
      // 서버사이드 렌더링으로 로그인 체크요청
      const response = await UserApi.checkLoginForServerStore(cookie);
      const temp = await response?.data;

      console.log('withAuthServer -------');
      console.log(JSON.stringify(temp));

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
      // console.error(error);
      console.log('비 로그인 상태 url:', url);
      const gsspData = await gssp(context);
      return {
        props: {
          pageProps: gsspData.props,
          loginInfo: { username: '', nickname: '', profileImageUri: '', sebureUri: '' },
        },
      };
    }
  };
}