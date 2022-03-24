import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Note = {
  noteId: string;
  folderId: string;
  title: string;
  text: string;
  createdAt: string | undefined;
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
      if (action.payload.noteId !== undefined) {
        state.map(note =>
          note.noteId === action.payload.noteId
            ? console.log('aaaa')
            : console.log('bbbb'),
        );
      }
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      if (action.payload.noteId !== undefined) {
        state.filter(note => note.noteId !== action.payload.noteId);
      }
    },
  },
});

export const {addNote, editNote, removeNote} = notesSlice.actions;
export default notesSlice.reducer;
