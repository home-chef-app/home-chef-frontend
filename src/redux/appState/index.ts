import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: false,
};
const appStateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = appStateSlice.actions;
export default appStateSlice.reducer;
