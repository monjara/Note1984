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
    add_folder: (state, action: PayloadAction<Folder>) => {
      state.list.push(action.payload);
    },
    edit_folder: (state, action: PayloadAction<Folder>) => {},
    remove_folder: (state, action: PayloadAction<Folder>) => {
      state.list.filter(l => {
        action.payload.id !== l.id;
      });
    },
  },
});

export const {add_folder, edit_folder, remove_folder} = foldersSlice.actions;
export default foldersSlice.reducer;
