import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Note = {
  id: number | undefined;
  folderId: number | undefined;
  title: string;
  text: string;
  created_at: string | undefined;
};

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    addNote: (state = initialState, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      if (action.payload.id !== undefined) {
        state[action.payload.id] = {
          id: action.payload.id,
          folderId: action.payload.folderId,
          title: action.payload.title,
          text: action.payload.text,
          created_at: action.payload.created_at,
        };
      }
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      if (action.payload.id !== undefined) {
        state.filter((_, index) => index !== action.payload.id);
      }
    },
  },
});

export const {addNote, editNote, removeNote, removeAllNote} =
  notesSlice.actions;
export default notesSlice.reducer;
