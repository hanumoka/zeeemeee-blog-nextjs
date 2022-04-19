import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import SettingApi from '../api/SettingApi';

interface SettingState {
  nickname: string;
  introduction: string;
  sebureUri: string;
  email: string;
  profileImageUri: string;
  setProfileImageUri: (uri: string) => void;
  fetchLoading: boolean;
  fetchError: string;
  fetchSetting: () => void;
}

const initStore = (set: SetState<SettingState>) => ({
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
      set(() => ({ fetchLoading: true }), false, 'settingFetch/success');
    } catch (error) {
      console.error(error);
      set(() => ({ fetchError: 'setting 조회 실패' }), false, 'settingFetch/error');
    } finally {
      set(() => ({ fetchLoading: false }), false, 'settingFetch/end');
    }
  },
});

const devStore = devtools(initStore);
const settingStore = create(devStore);
export default settingStore;
