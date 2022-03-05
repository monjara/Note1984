import {combineReducers} from 'redux';
import {Folder} from '../screens/FoldersScreen';
import {Note} from '../screens/NotesScreen';
import FoldersReducer from './FoldersReducer';
import NotesReducer from './NotesReducer';

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
