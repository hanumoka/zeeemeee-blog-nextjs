import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PeopleState {
  people: string[];
  addPerson: (person: string) => void;
}

const initStore = (set: SetState<PeopleState>) => ({
  people: ['hanumoka1', 'hanumoka2'],
  addPerson: (person: string) =>
    set((state) => ({
      people: [...state.people, person],
    })),
});

const devStore = devtools(initStore);

const peopleStore = create(devStore);

export default peopleStore;
