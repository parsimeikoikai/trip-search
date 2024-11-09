import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import tripSearchReducer from './tripSearchSlice';
export const store = configureStore({
  reducer: {
    search: searchReducer,
    tripSearch: tripSearchReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
