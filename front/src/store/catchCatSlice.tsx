import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { postAnswers } from "api/test";

type Answer = {
  gameType: "cat";
  correct: boolean;
  answer: boolean;
  asure: number;
  timestamp: [string, string];
};

type AnswerState = {
  tempAnswer: Answer;
  answerList: Answer[];
};

type AnswerProperty = keyof Answer;

const initialState: AnswerState = {
  tempAnswer: {
    gameType: "cat",
    correct: true,
    answer: true,
    asure: -1,
    timestamp: ["2023-05-11T05:00:47.557Z", "2023-05-11T05:00:47.557Z"],
  },
  answerList: [],
};

const catchCatSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addCatAnswer: (state) => {
      /*현재 tempAnswer를 answerList에 추가합니다.*/
      // console.log(current(state.tempAnswer));
      console.log(current(state.answerList));
      state.answerList.push(state.tempAnswer);
      state.tempAnswer.asure = -1;
    },
    setTempAnswerProperty: (
      state,
      action: PayloadAction<{
        property: AnswerProperty;
        value: number | boolean | "cat" | string[];
      }>
    ) => {
      const { property, value } = action.payload;
      state.tempAnswer[property] = value as never;
    },
    checkCatAnswer: (state) => {
      console.log(current(state.answerList));
    },
    submitCatAnswer: (state) => {
      const testData = {
        gameId: 0,
        userId: 0,
        date: new Date().toISOString(),
        gameType: "cat",
        problems: current(state.answerList),
      };
      postAnswers(testData);
    },
  },
});

export const {
  addCatAnswer,
  setTempAnswerProperty,
  checkCatAnswer,
  submitCatAnswer,
} = catchCatSlice.actions;
export default catchCatSlice.reducer;
