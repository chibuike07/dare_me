import * as t from "./actions";

export const defaultState = {
  startQuizz: false,
  quizData: [],
  currentQuizData: [],
  answeredQuizData: [],
  correctAnsweredQuiz: [],
  skippedQuiz: [],
  quizIndex: 0,
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case t.START_QUIZZ:
      return { ...state, startQuizz: payload };
    case t.FETCH_QUIZZ:
      return { ...state, quizData: payload };

    case t.CURRENT_QUIZZ:
      return { ...state, currentQuizData: payload };

    case t.CORRECT_ANSWERED_QUIZZ:
      return {
        ...state,
        correctAnsweredQuiz: [...state.correctAnsweredQuiz, payload],
      };

    case t.ANSWERED_QUIZZ:
      return {
        ...state,
        answeredQuizData: [...state.answeredQuizData, payload],
      };

    case t.SKIP_QUIZZ:
      return {
        ...state,
        answeredQuizData: [...state.skippedQuiz, payload],
      };

    case t.QUIZZ_INDEX:
      return { ...state, quizIndex: payload };

    default:
      return state;
  }
};
