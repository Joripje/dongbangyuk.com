import { configureStore } from "@reduxjs/toolkit";

import catchCatSlice from "./catchCatSlice";
import turnFigureSlice from "./turnFigureSlice";

export const store = configureStore({
  reducer: {
    catchCat: catchCatSlice,
    turnFigure: turnFigureSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
