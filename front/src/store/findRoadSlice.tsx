import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postAnswers, putFindRoadProblems } from "api/test";
// import { resetGameState } from "./testControlSlice";

type Answer = {
  gameType: string;
  problemId: number;
  answer: number[][];
  timestamp: string[];
  clicks: number;
};

type State = {
  userId: number;
  gameId: number;
  date: string;
  gameType: "road";
  problems: Answer[];
};

const initialState: State = {
  userId: 19,
  gameId: 0,
  date: new Date().toISOString(),
  gameType: "road",
  problems: [],
};

const findRoadSlice = createSlice({
  name: "findRoad",
  initialState,
  reducers: {
    saveRoadAnswer: (state, action: PayloadAction<Answer>) => {
      state.problems.push(action.payload);
    },
    submitRoadAnswer: (state) => {
      postAnswers(state);
    },
  },
});

export const { saveRoadAnswer, submitRoadAnswer } = findRoadSlice.actions;
export default findRoadSlice.reducer;
