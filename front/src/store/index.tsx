import { configureStore } from "@reduxjs/toolkit";

import catchCatSlice from "./catchCatSlice";

export const store = configureStore({
  reducer: {
    catchCat: catchCatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
