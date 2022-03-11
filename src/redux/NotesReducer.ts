import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Note = {
  id: number | undefined;
  folder_id: number | undefined;
  title: string;
  text: string;
  created_at: string | undefined;
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    add: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    edit: (state, action: PayloadAction<Note>) => {
      if (action.payload.id !== undefined) {
        state[action.payload.id] = {
          id: action.payload.id,
          folder_id: action.payload.folder_id,
          title: action.payload.title,
          text: action.payload.text,
          created_at: action.payload.created_at,
        };
      }
    },
    remove: (state, action: PayloadAction<Note>) => {
      if (action.payload.id !== undefined) {
        state.filter((_, index) => index !== action.payload.id);
      }
    },
  },
});

export const {add, edit, remove} = notesSlice.actions;
export default notesSlice.reducer;
