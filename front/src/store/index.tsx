import { configureStore } from "@reduxjs/toolkit";

import findRoadSlice from "./findRoadSlice";
import catchCatSlice from "./catchCatSlice";
import turnFigureSlice from "./turnFigureSlice";
import testControlSlice from "./testControlSlice";

export const store = configureStore({
  reducer: {
    findRoad: findRoadSlice,
    catchCat: catchCatSlice,
    turnFigure: turnFigureSlice,
    testControl: testControlSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
