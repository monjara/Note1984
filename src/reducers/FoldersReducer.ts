import {AnyAction} from 'redux';
import {FoldersState} from './rootReducer';

const initilaState: FoldersState = {
  list: [],
};

const FoldersReducer = (state = initilaState, action: AnyAction) => {
  let newList = [...state.list];

  switch (action.type) {
    case 'CREATE_FOLDER':
      newList.push({
        id: action.payload.id,
        name: action.payload.name,
        noteCount: action.payload.noteCount,
      });
      break;
    case 'UPDATE_FOLDER':
      newList[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        noteCount: action.payload.noteCount,
      };
      break;
    case 'DELETE_FOLDER':
      newList = newList.filter((_, index) => index !== action.payload.id);
      {
        /** TODO: Delete notes which this folder contains */
      }
      break;
  }
  return {...state, list: newList};
};

export default FoldersReducer;
