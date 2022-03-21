import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitializedState = {
  initFlg: boolean;
};

const initialState: InitializedState = {initFlg: true};

const initialSlice = createSlice({
  name: 'initial',
  initialState: initialState,
  reducers: {
    initialize: (state = initialState, action: PayloadAction<boolean>) => {
      state.initFlg = action.payload;
    },
  },
});

export const {initialize} = initialSlice.actions;
export default initialSlice.reducer;
