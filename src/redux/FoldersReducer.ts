import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Folder = {
  id: number;
  name: string;
  noteCount: number;
};

const foldersSlice = createSlice({
  name: 'notes',
  initialState: [] as Folder[],
  reducers: {
    add: (state: Folder[], action) => {
      state.push(action.payload);
    },
    edit: (state, action: PayloadAction<Folder>) => {
      if (action.payload.id !== undefined) {
        state[action.payload.id] = {
          id: action.payload.id,
          name: action.payload.name,
          noteCount: action.payload.noteCount,
        };
      }
    },
    remove: (state, action: PayloadAction<Folder>) => {
      if (action.payload.id !== undefined) {
        state.filter((_, index) => index !== action.payload.id);
      }
    },
  },
});

export const {add, edit, remove} = foldersSlice.actions;
export default foldersSlice.reducer;
