import {AnyAction} from 'redux';
import {NotesState} from './rootReducer';

const initilaState: NotesState = {
  list: [],
};

const NotesReducer = (state = initilaState, action: AnyAction) => {
  let newList = [...state.list];

  switch (action.type) {
    case 'CREATE_NOTE':
      newList.push({
        id: action.payload.id,
        folder_id: action.payload.folderId,
        title: action.payload.title,
        text: action.payload.text,
        created_at: action.payload.created_at,
      });
      break;
    case 'UPDATE_NOTE':
      newList[action.payload.id] = {
        id: action.payload.id,
        folder_id: action.payload.folderId,
        title: action.payload.title,
        text: action.payload.text,
        created_at: action.payload.created_at,
      };
      break;
    case 'DELETE_NOTE':
      newList = newList.filter((_, index) => index !== action.payload.id);
      break;
  }
  return {...state, list: newList};
};

export default NotesReducer;
