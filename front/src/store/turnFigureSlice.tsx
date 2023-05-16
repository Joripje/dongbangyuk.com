import { createSlice, current } from "@reduxjs/toolkit";
import { postRoateAnswers } from "api/test";
import {
  button_a,
  button_b,
  button_c,
  button_d,
} from "assets/images/turnFigure";

type Answer = {
  gameType: "rotate";
  problem: { flip: number; degree: number };
  correct: { flip: number; degree: number };
  choices: number[];
  clicks: number;
  rounds: number;
  timestamp: [string, string];
};

type State = {
  target: number;
  clicks: number;
  tempAnswer: Answer;
  answerList: Answer[];
  images: string[];
};

const initialState: State = {
  target: 0,
  clicks: 20,
  tempAnswer: {
    gameType: "rotate",
    problem: { flip: 0, degree: 0 },
    correct: { flip: 0, degree: 0 },
    choices: Array(8).fill(-1),
    clicks: -1,
    rounds: -1,
    timestamp: ["2023-05-10T01:08:49.694Z", "2023-05-10T01:08:49.694Z"],
  },
  answerList: [],
  images: [button_a, button_b, button_c, button_d],
};

const turnFigureSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    generateProblem: (state) => {
      let num1 = Math.floor(Math.random() * 8);
      let num2 = Math.floor(Math.random() * 8);
      while (num1 === num2) {
        num1 = Math.floor(Math.random() * 8);
        num2 = Math.floor(Math.random() * 8);
      }

      state.tempAnswer.correct = {
        flip: num1 % 2,
        degree: num2,
      };
      state.tempAnswer.problem = {
        flip: num2 % 2,
        degree: num1,
      };
      state.tempAnswer.timestamp[0] = new Date().toISOString();
    },

    pushChoice: (state, action) => {
      const { tempAnswer, target } = state;
      tempAnswer.choices[target] = action.payload;
      state.target = target + 1;
      state.clicks -= 1;
    },

    popChoice: (state) => {
      const { target } = state;
      if (target === 0) return;
      state.tempAnswer.choices[target - 1] = -1;
      state.target = target - 1;
      state.clicks -= 1;
    },

    clearChoice: (state) => {
      if (state.target === 0) return;
      state.tempAnswer.choices = Array(8).fill(-1);
      state.clicks -= 1;
      state.target = 0;
    },

    checkAnswer: (state) => {
      console.log(current(state.answerList));
    },

    submitAnswers: (state) => {
      const testData = {
        gameId: 0,
        userId: 0,
        date: new Date().toISOString(),
        gameType: "rotate",
        problems: current(state.answerList),
      };
      console.log(testData);
      postRoateAnswers(testData);
    },

    addTurnAnswer: (state) => {
      state.tempAnswer.timestamp[1] = new Date().toISOString();
      state.tempAnswer.clicks = state.clicks;

      state.answerList.push(state.tempAnswer);

      state.clicks = 20;
    },
  },
});

export const {
  generateProblem,
  addTurnAnswer,
  pushChoice,
  popChoice,
  clearChoice,
  checkAnswer,
  submitAnswers,
} = turnFigureSlice.actions;
export default turnFigureSlice.reducer;
