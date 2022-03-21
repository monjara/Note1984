import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Folder = {
  id: number;
  name: string;
  noteCount: number;
};

const initialState: Folder[] = [{id: 1, name: 'notes', noteCount: 0}];

const foldersSlice = createSlice({
  name: 'notes',
  initialState: [] as Folder[],
  reducers: {
    addFolder: (state = initialState, action: PayloadAction<Folder>) => {
      state.push(action.payload);
    },
    editFolder: (state, action: PayloadAction<Folder>) => {},
    removeFolder: (state, action: PayloadAction<Folder>) => {
      state.filter(l => {
        action.payload.id !== l.id;
      });
    },
  },
});

export const {addFolder, editFolder, removeFolder} = foldersSlice.actions;
export default foldersSlice.reducer;
