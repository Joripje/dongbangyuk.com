import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

type Answer = {
  gameType: "cat";
  correct: boolean;
  answer: boolean;
  asure: number;
};

type AnswerState = {
  tempAnswer: Answer;
  answerList: Answer[];
};

type AnswerProperty = keyof Answer;

const initialState: AnswerState = {
  tempAnswer: { gameType: "cat", correct: true, answer: true, asure: -1 },
  answerList: [],
};

const catchCatSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addAnswer: (state) => {
      /*현재 tempAnswer를 answerList에 추가합니다.*/
      console.log(current(state.tempAnswer));
      state.answerList.push(state.tempAnswer);
    },
    setTempAnswerProperty: (
      state,
      action: PayloadAction<{
        property: AnswerProperty;
        value: number | boolean | "cat";
      }>
    ) => {
      const { property, value } = action.payload;
      state.tempAnswer[property] = value as never;
    },
    checkAnswer: (state) => {
      console.log(current(state.answerList));
    },
  },
});

export const { addAnswer, setTempAnswerProperty, checkAnswer } =
  catchCatSlice.actions;
export default catchCatSlice.reducer;
