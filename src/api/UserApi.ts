import Send from '../utils/Send';

export default {
  signup(email: string, password: string, passwordRepeat: string) {
    return Send({
      url: '/user/signup',
      method: 'post',
      data: {
        username: email,
        password,
        passwordRepeat,
      },
    });
  },
  login(email: string, password: string) {
    return Send({
      url: '/user/login',
      method: 'post',
      data: {
        username: email,
        password,
      },
    });
  },
  logout() {
    return Send({
      url: '/user/logout',
      method: 'post',
    });
  },
  checkLoginForServerStore(cookie) {
    return Send({
      url: '/user/logininfo',
      method: 'get',
      withCredentials: true,
      headers: {
        Cookie: cookie || '',
      },
    });
  },
  // postSingUp() {
  //   return Send({
  //     // baseURL설정되어 있기 때문에 그 뒤의 URL만 작성합니다.
  //     url: '/news/1.json',
  //     method: 'get',
  //   });
  // },
};
