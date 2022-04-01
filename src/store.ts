import create, { SetState } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

const store2 = devtools(store);
const store3 = persist(store2, { name: 'people_settings' });

const useStore = create(store3);

export default useStore;
