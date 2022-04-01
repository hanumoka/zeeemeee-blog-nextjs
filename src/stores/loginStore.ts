import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

interface loginState {
  username: string;
  nickname: string;
  roles: string[];
  loginLoading: boolean;
  loginError: string;
  loginFetch: (email: string, password: string) => void;
}

const initStore = (set: SetState<loginState>) => ({
  username: '',
  nickname: '',
  roles: [],
  loginLoading: false,
  loginError: '',
  loginFetch: async (email: string, password: string) => {
    try {
      set(() => ({ loginLoading: true }), false, 'loginFetch/start');
      const response = await axios.post('http://localhost:8080/api/login', {
        username: email,
        password,
      });

      set(
        { username: 'hanumoka', nickname: '하누모카', roles: ['ROLE_ADMIN'], loginError: '' },
        false,
        'loginFetch/success'
      );
      console.log('response:', response);
    } catch (error) {
      console.error(error);
    } finally {
      set(() => ({ loginLoading: false }), false, 'loginFetch/end');
    }
  },
});

const devStore = devtools(initStore);

const loginStore = create(devStore);

export default loginStore;
