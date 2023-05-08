import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

type Answer = {
  gameType: "turn";
  choice: number[];
};

type AnswerState = {
  target: number;
  tempAnswer: Answer;
  answerList: Answer[];
};

const initialState: AnswerState = {
  target: 0,
  tempAnswer: { gameType: "turn", choice: Array(8).fill(-1) },
  answerList: [],
};

const catchCatSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addAnswer: (state) => {
      /*현재 tempAnswer를 answerList에 추가합니다.*/
      state.answerList.push(state.tempAnswer);
    },
    pushChoice: (state, action) => {
      const { tempAnswer, target } = state;
      tempAnswer.choice[target] = action.payload;
    },
    popChoice: (state) => {
      const { tempAnswer, target } = state;
      tempAnswer.choice[target] = -1;
    },
    clearChoice: (state) => {
      state.tempAnswer.choice = Array(8).fill(-1);
    },
    checkAnswer: (state) => {
      console.log(current(state.answerList));
    },
  },
});

export const { addAnswer, checkAnswer } = catchCatSlice.actions;
export default catchCatSlice.reducer;
