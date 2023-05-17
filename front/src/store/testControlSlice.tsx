import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameProps = undefined | "road" | "rps" | "rotate" | "cat";

type StateType = {
  game: GameProps;
  face: number;
  isGaming: boolean;
  isPreparing: boolean;
  isEnough: boolean;
};

const initialState: StateType = {
  game: undefined,
  face: 0,
  isGaming: false,
  isPreparing: true,
  isEnough: true,
};

const testControlSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<GameProps>) => {
      state.game = action.payload;
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
    resetGameState: (state) => {
      state.game = undefined;
      state.isGaming = false;
      state.isPreparing = true;
      state.isEnough = true;
    },
    setFace: (state, action) => {
      state.face = action.payload;
    },
  },
});

export const { setGame, setBoolState, resetGameState, setFace } =
  testControlSlice.actions;
export default testControlSlice.reducer;
