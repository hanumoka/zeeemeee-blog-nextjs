import create from 'zustand';

interface PeopleState {
  people: string[];
  addPerson: (person: string) => void;
}

const useStore = create<PeopleState>((set) => ({
  people: ['hanumoka1', 'hanumoka2'],
  addPerson: (person) =>
    set((state) => ({
      people: [...state.people, person],
    })),
}));

export default useStore;
