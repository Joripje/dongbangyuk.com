import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

type GameProps = undefined | "road" | "rps" | "rotate" | "cat";

type StateType = {
  game: GameProps;
  isGaming: boolean;
  isPreparing: boolean;
  isEnough: boolean;
};

const initialState: StateType = {
  game: undefined,
  isGaming: true,
  isPreparing: true,
  isEnough: true,
};

const testControlSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameProps>) => {
      state.game = action.payload;
      console.log(current(state));
    },
    setBoolState: (
      state,
      action: PayloadAction<{
        property: "isGaming" | "isPreparing" | "isEnough";
        value: boolean;
      }>
    ) => {
      const { property, value } = action.payload;
      state[property] = value;
    },
  },
});

export const { setGame, setBoolState } = testControlSlice.actions;
export default testControlSlice.reducer;
