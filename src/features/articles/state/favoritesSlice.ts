import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { load, save } from '@shared/lib/localStorage';

type State = { ids: string[] };
const initial: State = load<State>('favorites', { ids: [] });

const slice = createSlice({
  name: 'favorites',
  initialState: initial,
  reducers: {
    toggle(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id))
        state.ids = state.ids.filter((x) => x !== id);
      else state.ids.push(id);
      save('favorites', state);
    },
    setAll(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
      save('favorites', state);
    },
  },
});

export const { toggle, setAll } = slice.actions;
export default slice.reducer;
