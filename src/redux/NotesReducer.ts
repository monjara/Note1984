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
      const note = state.find(
        stateNote => stateNote.noteId === action.payload.noteId,
      );
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
    removeNotesRelatedFolder: (
      state = initialState,
      action: PayloadAction<Omit<Note, 'noteId' | 'title' | 'text'>>,
    ) => {
      return state.filter(note => note.folderId !== action.payload.folderId);
    },
  },
});

export const {addNote, editNote, removeNote, removeNotesRelatedFolder} =
  notesSlice.actions;
export default notesSlice.reducer;
