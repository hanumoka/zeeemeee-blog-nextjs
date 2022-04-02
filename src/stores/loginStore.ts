import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

interface loginState {
  username: string;
  nickname: string;
  loginLoading: boolean;
  loginError: string;
  loginFetch: (email: string, password: string) => void;
}

const initStore = (set: SetState<loginState>) => ({
  username: '',
  nickname: '',
  loginLoading: false,
  loginError: '',
  loginFetch: async (email: string, password: string) => {
    try {
      set(
        () => ({ loginLoading: true, username: '', nickname: '', loginError: '' }),
        false,
        'loginFetch/start'
      );
      const response = await axios.post('http://localhost:8080/api/login', {
        username: email,
        password,
      });

      const { username, nickname } = response.data;

      set({ username, nickname, loginError: '' }, false, 'loginFetch/success');
      console.log('response:', response);
    } catch (error) {
      console.error(error);
      console.dir(error);
      set({ loginError: '로그인 실패' }, false, 'loginFetch/error');
    } finally {
      set(() => ({ loginLoading: false }), false, 'loginFetch/end');
    }
  },
});

const devStore = devtools(initStore);

const loginStore = create(devStore);

export default loginStore;
