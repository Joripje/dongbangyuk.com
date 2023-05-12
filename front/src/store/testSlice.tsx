import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

const initialState = {};

const testSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
});

export const {} = testSlice.actions;
export default testSlice.reducer;
