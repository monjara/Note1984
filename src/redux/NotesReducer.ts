import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Note = {
  noteId: string;
  folderId: string;
  title: string;
  text: string;
};

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    addNote: (state = initialState, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    editNote: (state = initialState, action: PayloadAction<Note>) => {
      const note = state.find(note => note.noteId === action.payload.noteId);
      if (note) {
        note.title = action.payload.title;
        note.text = action.payload.text;
      }
    },
    removeNote: (
      state = initialState,
      action: PayloadAction<Omit<Note, 'folderId' | 'title' | 'text'>>,
    ) => {
      return state.filter(note => note.noteId !== action.payload.noteId);
    },
  },
});

export const {addNote, editNote, removeNote} = notesSlice.actions;
export default notesSlice.reducer;
