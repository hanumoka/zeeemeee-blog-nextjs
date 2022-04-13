import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

// layout을 적용할건지 여부를 관리하는 store
interface LayoutState {
  layoutActive: boolean;
  onLayout: () => void;
  offLayout: () => void;
}

const initStore = (set: SetState<LayoutState>) => ({
  layoutActive: true,
  onLayout: () =>
    set(
      () => ({
        layoutActive: true,
      }),
      false,
      'layoutStore/onLayout'
    ),
  offLayout: () =>
    set(
      () => ({
        layoutActive: false,
      }),
      false,
      'layoutStore/offlayout'
    ),
});

const devStore = devtools(initStore);

const layoutStore = create(devStore);

export default layoutStore;
