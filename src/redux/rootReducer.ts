import {combineReducers} from 'redux';
import FoldersReducer, {Folder} from './FoldersReducer';
import NotesReducer, {Note} from './NotesReducer';


export interface FoldersState {
  list: Array<Folder>;
}

export interface NotesState {
  list: Array<Note>;
}

const rootReducer = combineReducers({
  folders: FoldersReducer,
  notes: NotesReducer,
});

export default rootReducer;
