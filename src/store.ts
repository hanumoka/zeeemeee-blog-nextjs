import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PeopleState {
  people: string[];
  addPerson: (person: string) => void;
}

const store = (set: SetState<PeopleState>) => ({
  people: ['hanumoka1', 'hanumoka2'],
  addPerson: (person: string) =>
    set((state) => ({
      people: [...state.people, person],
    })),
});

const devStore = devtools(store);

const useStore = create(devStore);

export default useStore;
