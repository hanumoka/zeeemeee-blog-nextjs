import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

import UserApi from '../api/UserApi';

interface loginState {
  username: string;
  nickname: string;
  sebureUri: string;
  introduction: string;
  profileImageUri: string;
  setNickname: (param: string) => void;
  setProfileImageUri: (param: string) => void;
  setLoginInfo: (
    username: string,
    nickname: string,
    profileImageUri: string,
    sebureUri: string
  ) => void;
  loginFetch: (email: string, password: string) => void;
  logoutFetch: () => void;
}

const initStore = (set: SetState<loginState>, get: GetState<loginState>) => ({
  username: '', // email 형태, pk
  nickname: '', // 별명
  sebureUri: '', // 블로그 URL
  introduction: '', // 자기소개
  profileImageUri: '', // 프로필 이미지 URI
  setNickname: (param: string) => {
    set({ nickname: param }, false, 'setNickname');
  },
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
  loginFetch: async (email: string, password: string) => {
    try {
      set(
        () => ({
          username: '', // email 형태, pk
          nickname: '', // 별명
          sebureUri: '', // 블로그 URL
          introduction: '', // 자기소개
          profileImageUri: '', // 프로필 이미지 URI
        }),
        false,
        'loginFetch/start'
      );

      const response = await UserApi.login(email, password);
      const { username, nickname, profileImageUri, sebureUri, introduction } = response.data;
      set(
        { username, nickname, profileImageUri, sebureUri, introduction },
        false,
        'loginFetch/success'
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  logoutFetch: async () => {
    try {
      await UserApi.logout();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

const devStore = devtools(initStore);
const loginStore = create(devStore);
export default loginStore;
