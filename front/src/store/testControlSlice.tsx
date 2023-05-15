import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

const initialState = {
  answer: {},
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
});

export const {} = testSlice.actions;
export default testSlice.reducer;
