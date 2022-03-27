import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Folder = {
  folderId: string;
  name: string;
  noteCount: number;
};

type HandleNotesCountType = Omit<Folder, 'name' | 'noteCount'>;

const initialState: Folder[] = [{folderId: '1', name: 'notes', noteCount: 0}];

const foldersSlice = createSlice({
  name: 'notes',
  initialState: [] as Folder[],
  reducers: {
    addFolder: (state = initialState, action: PayloadAction<Folder>) => {
      state.push(action.payload);
    },
    editFolder: (state, action: PayloadAction<Omit<Folder, 'noteCount'>>) => {
      const folder = state.find(
        folder => folder.folderId === action.payload.folderId,
      );
      if (folder) {
        folder.name = action.payload.name;
      }
    },
    removeFolder: (state, action: PayloadAction<Folder>) => {
      state.filter(folder => {
        folder.folderId !== action.payload.folderId;
      });
    },
    addNotesCount: (state, action: PayloadAction<HandleNotesCountType>) => {
      const folder = state.find(
        folder => folder.folderId === action.payload.folderId,
      );
      if (folder) {
        folder.noteCount += 1;
      }
    },
    reduceNotesCount: (state, action: PayloadAction<HandleNotesCountType>) => {
      const folder = state.find(
        folder => folder.folderId === action.payload.folderId,
      );
      if (folder) {
        folder.noteCount -= 1;
      }
    },
  },
});

export const {
  addFolder,
  editFolder,
  removeFolder,
  addNotesCount,
  reduceNotesCount,
} = foldersSlice.actions;
export default foldersSlice.reducer;
