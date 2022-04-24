import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

import UserApi from '../api/UserApi';

interface loginState {
  username: string;
  nickname: string;
  sebureUri: string;
  setNickname: (param: string) => void;
  profileImageUri: string;
  setProfileImageUri: (param: string) => void;
  setLoginInfo: (
    username: string,
    nickname: string,
    profileImageUri: string,
    sebureUri: string
  ) => void;
  loginLoading: boolean;
  loginError: string;
  loginFetch: (email: string, password: string) => void;
  logoutLoading: boolean;
  logoutError: string;
  logoutFetch: () => void;
}

const initStore = (set: SetState<loginState>, get: GetState<loginState>) => ({
  username: '', // email 형태, pk
  nickname: '', // 별명
  sebureUri: '', // 블로그 URL
  setNickname: (param: string) => {
    set({ nickname: param }, false, 'setNickname');
  },
  profileImageUri: '', // 프로필 이미지 URI
  setProfileImageUri: (param: string) => {
    set({ profileImageUri: param }, false, 'setProfileImageUri');
  },
  setLoginInfo: (
    username: string,
    nickname: string,
    profileImageUri: string,
    sebureUri: string
  ) => {
    // TODO: 기존 값이 있는 상태에서 빈 값이 set 될때 클라이언트에 로그인이 만료된 것을 알려줘야 한다. ==> 로그인 만료 ==> 홈 페이지로 이동
    set(
      {
        username: username,
        nickname: nickname,
        profileImageUri: profileImageUri,
        sebureUri: sebureUri,
      },
      false,
      'loginFetch/setLoginInfo'
    );
  },
  loginLoading: false,
  loginError: '',
  loginFetch: async (email: string, password: string) => {
    try {
      set(
        () => ({ loginLoading: true, username: '', nickname: '', loginError: '' }),
        false,
        'loginFetch/start'
      );

      const response = await UserApi.login(email, password);
      const { username, nickname, profileImageUri, sebureUri } = response.data;
      set(
        { username, nickname, profileImageUri, sebureUri, loginError: '' },
        false,
        'loginFetch/success'
      );
    } catch (error) {
      console.error(error);
      set({ loginError: '로그인 실패' }, false, 'loginFetch/error');
    } finally {
      set(() => ({ loginLoading: false }), false, 'loginFetch/end');
    }
  },
  logoutLoading: false,
  logoutError: '',
  logoutFetch: async () => {
    try {
      set(() => ({ logoutLoading: true, logoutError: '' }), false, 'logoutFetch/start');
      await UserApi.logout();
      set({ logoutError: '' }, false, 'logoutFetch/success');
    } catch (error) {
      console.error(error);
      set({ loginError: '로그아웃 실패' }, false, 'logoutFetch/error');
    } finally {
      set(() => ({ logoutLoading: false, username: '', nickname: '' }), false, 'logoutFetch/end');
    }
  },
});

const devStore = devtools(initStore);
const loginStore = create(devStore);
export default loginStore;
