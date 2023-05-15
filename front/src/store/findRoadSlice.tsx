import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

type Answer = {
  gameType: "cat";
  correct: boolean;
  answer: boolean;
  asure: number;
  timestamp: string;
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
    timestamp: "2023-05-11T05:00:47.557Z",
  },
  answerList: [],
};

const findRoadSlice = createSlice({
  name: "findRoad",
  initialState,
  reducers: {
    addCatAnswer: (state) => {
      /*현재 tempAnswer를 answerList에 추가합니다.*/
      console.log(current(state.tempAnswer));
      state.answerList.push(state.tempAnswer);
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
    checkAnswer: (state) => {
      console.log(current(state.answerList));
    },
  },
});

export const { addCatAnswer, setTempAnswerProperty, checkAnswer } =
  findRoadSlice.actions;
export default findRoadSlice.reducer;
