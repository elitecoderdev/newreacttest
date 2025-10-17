import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@features/ui/state/uiSlice';
import favoritesReducer from '@features/articles/state/favoritesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
