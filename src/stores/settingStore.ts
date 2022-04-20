import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import SettingApi from '../api/SettingApi';

interface SettingState {
  images: Array<any>;
  setImages: (images: Array<any>) => void;
  nickname: string;
  introduction: string;
  sebureUri: string;
  email: string;
  profileImageUri: string;
  setProfileImageUri: (uri: string) => void;
  fetchLoading: boolean;
  fetchError: string;
  fetchSetting: () => void;
  uploadProfileImageLoading: boolean;
  uploadProfileImageError: string;
  uploadProfileImage: (formData: any) => any;
  deleteProfileImageLoading: boolean;
  deleteProfileImageError: string;
  deleteProfileImage: () => void;
  isModNickAndIntro: boolean;
  setIsModNickAndIntro: (param) => void;
  updateNicknameAndIntroductionLoading: boolean;
  updateNicknameAndIntroductionError: string;
  updateNicknameAndIntroduction: (nickname: string, introduction: string) => any;
}

const initStore = (set: SetState<SettingState>, get: GetState<SettingState>) => ({
  images: [],
  setImages: (images) => {
    set({ images }, false, 'setImages');
  },
  nickname: '',
  introduction: '',
  sebureUri: '',
  email: '',
  profileImageUri: '',
  setProfileImageUri: (uri) => {
    set({ profileImageUri: uri }, false, 'setProfileImageUri');
  },
  fetchLoading: false,
  fetchError: '',
  fetchSetting: async () => {
    try {
      set(() => ({ fetchLoading: true }), false, 'settingFetch/start');
      const response = await SettingApi.getSetting();
      const { nickname, introduction, sebureUri, email, profileImageUri } = response.data;
      set(
        { fetchError: '', nickname, introduction, sebureUri, email, profileImageUri },
        false,
        'settingFetch/success'
      );
    } catch (error) {
      console.error(error);
      set(() => ({ fetchError: 'setting 조회 실패' }), false, 'settingFetch/error');
    } finally {
      set(() => ({ fetchLoading: false }), false, 'settingFetch/end');
    }
  },
  uploadProfileImageLoading: false,
  uploadProfileImageError: '',
  uploadProfileImage: async (formData) => {
    try {
      const response = await SettingApi.uploadProfileImage(formData);
      get().setProfileImageUri(response.data.profileImageUri);
      return response.data.profileImageUri;
    } catch (error) {
      console.log(error);
    }
  },
  deleteProfileImageLoading: false,
  deleteProfileImageError: '',
  deleteProfileImage: async () => {
    try {
      await SettingApi.deleteProfileImage();
      get().setProfileImageUri('');
    } catch (error) {
      console.log(error);
    }
  },
  isModNickAndIntro: false,
  setIsModNickAndIntro: (param) => {
    set(() => ({ isModNickAndIntro: param }), false, 'setIsModNickAndIntro');
  },
  updateNicknameAndIntroductionLoading: false,
  updateNicknameAndIntroductionError: '',
  updateNicknameAndIntroduction: async (nickname: string, introduction: string) => {
    try {
      const response = await SettingApi.updateNicknameAndIntroduction({ nickname, introduction });
      const { nickname: savedNickname, introduction: savedIntroduction } = response.data;
      set(
        () => ({ nickname: savedNickname, introduction: savedIntroduction }),
        false,
        'updateNicknameAndIntroduction/success'
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});

const devStore = devtools(initStore);
const settingStore = create(devStore);
export default settingStore;
