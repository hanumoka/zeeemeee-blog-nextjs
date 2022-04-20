import Send from '../utils/Send';

export default {
  login(email, password) {
    return Send({
      url: '/login',
      method: 'post',
      data: {
        username: email,
        password,
      },
    });
  },
  logout() {
    return Send({
      url: '/logout',
      method: 'post',
    });
  },
  checkLoginForServerStore(cookie) {
    return Send({
      url: '/logininfo',
      method: 'post',
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
