import * as t from "./actions";

export const defaultState = {
  startQuizz: false,
  quizData: [],
  currentQuizData: [],
  answeredQuizData: [],
  correctAnsweredQuiz: [],
  doLater: [],
  countSelectedOptions: 0,
  quizIndex: 0,
  showFeedBack: false,
  quizDifficulty: "RANDOM",
  cloneFetchQuizz: [],
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
    case t.RESET:
      return {
        ...state,
        startQuizz: false,
        showFeedBack: false,
        quizIndex: 0,
        countSelectedOptions: 0,
        correctAnsweredQuiz: [],
        currentQuizData: [],
        quizData: [],
        answeredQuizData: [],
        doLater: [],
        quizDifficulty: "RANDOM",
        cloneFetchQuizz: [],
      };

    case t.ANSWERED_QUIZZ:
      return {
        ...state,
        answeredQuizData: [...state.answeredQuizData, payload],
      };

    case t.DO_LATER:
      return {
        ...state,
        doLater: [...state.doLater, payload],
      };

    case t.QUIZZ_INDEX:
      return { ...state, quizIndex: payload };

    case t.COUNT_SELECTED_OPTION:
      return { ...state, countSelectedOptions: payload };

    case t.SHOW_FEEDBACK:
      return { ...state, showFeedBack: payload };

    case t.GET_DIFFICULTY:
      return { ...state, quizDifficulty: payload };

    case t.CLONE_FETCH_QUIZZ:
      return { ...state, cloneFetchQuizz: payload };

    default:
      return state;
  }
};
