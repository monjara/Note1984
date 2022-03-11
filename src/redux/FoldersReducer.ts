import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Folder = {
  id: number;
  name: string;
  noteCount: number;
};

const initialState = {
  list: [],
};

const foldersSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<Folder>) => {
      state.list.push(action.payload);
    },
    edit: (state, action: PayloadAction<Folder>) => {},
    remove: (state, action: PayloadAction<Folder>) => {},
  },
});

export const {add, edit, remove} = foldersSlice.actions;
export default foldersSlice.reducer;
