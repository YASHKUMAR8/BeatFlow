import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shahzamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shahzamCoreApi.reducerPath]: shahzamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getGetDefaultMiddleware) => getGetDefaultMiddleware().concat(shahzamCoreApi.middleware),
});
