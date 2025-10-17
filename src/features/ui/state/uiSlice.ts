import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  theme: 'light' | 'dark';
  globalLoading: boolean;
};

const initialState: UIState = { theme: 'dark', globalLoading: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
  },
});

export const { setTheme, setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;
