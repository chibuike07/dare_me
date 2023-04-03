import { v4 } from "uuid";
import SlightlyVoice from "../assets/slight_victory.wav";
import WinningVoice from "../assets/winner.wav";
import LosingVoice from "../assets/loser.wav";
import FailedVoice from "../assets/failedQuizVoice.wav";

import {
  COUNT_SELECTED_OPTION,
  CURRENT_QUIZZ,
  QUIZZ_INDEX,
  SHOW_FEEDBACK,
} from "../config/actions";

/**
 * It's a function that handles the next quiz.
 */
export const handleNextQuiz = ({
  currentQuizData,
  quizData,
  correctAnsweredQuiz,
  quizIndex,
  doLater,
  answeredQuizData,
  dispatch,
}) => {
  let finishedText = new SpeechSynthesisUtterance(
    `woa! you have reached to the end of the quiz with ${correctAnsweredQuiz?.length}`
  );

  if (currentQuizData[0]?.no === quizData[quizData.length - 1]?.no) {
    let scoredPercentage =
      (correctAnsweredQuiz?.length / quizData?.length) * 100;
    const passedQuizVoice = new Audio(SlightlyVoice);
    const failedQuizVoice = new Audio(FailedVoice);
    if (parseInt(scoredPercentage, 10) < 50) {
      failedQuizVoice.addEventListener("canplaythrough", () => {
        failedQuizVoice.play();
        speechSynthesis.speak(finishedText);
        setTimeout(() => {
          failedQuizVoice.pause();
          const userRecord = {
            id: v4(),
            correctAnsweredQuiz,
            quizData,
            doLater,
            answeredQuizData,
          };

          if (
            localStorage.getItem("userRecord") === undefined ||
            localStorage.getItem("userRecord") === null
          ) {
            localStorage.setItem("userRecord", JSON.stringify(userRecord));
          } else {
            localStorage.setItem("userRecord", JSON.stringify(userRecord));
          }

          dispatch({ type: SHOW_FEEDBACK, payload: true });
        }, 5000);
      });
    } else if (parseInt(scoredPercentage, 10) >= 50) {
      passedQuizVoice.addEventListener("canplaythrough", () => {
        passedQuizVoice.play();
        speechSynthesis.speak(finishedText);
        setTimeout(() => {
          passedQuizVoice.pause();
          const userRecord = {
            id: v4(),
            correctAnsweredQuiz,
            quizData,
            doLater,
            answeredQuizData,
          };

          if (
            localStorage.getItem("userRecord") === undefined ||
            localStorage.getItem("userRecord") === null
          ) {
            localStorage.setItem("userRecord", JSON.stringify(userRecord));
          } else {
            localStorage.setItem("userRecord", JSON.stringify(userRecord));
          }

          dispatch({ type: SHOW_FEEDBACK, payload: true });
        }, 4000);
      });
    }
  } else {
    let _quizIndex = quizIndex;
    _quizIndex = _quizIndex + 1;
    _quizIndex = _quizIndex % quizData.length;
    dispatch({ type: QUIZZ_INDEX, payload: _quizIndex });
    dispatch({
      type: CURRENT_QUIZZ,
      payload: [quizData[_quizIndex]],
    });
    dispatch({ type: COUNT_SELECTED_OPTION, payload: 0 });
  }
};

export const _difficulty = ["EASY", "MEDIUM", "HARD"];

/**
 * It takes in an object with a dispatch function, a countSelectedOptions number, and a t object, and
 * returns a boolean.
 * @returns A function that takes an object as an argument.
 */
export const handleDoubleSelects = ({ dispatch, countSelectedOptions, t }) => {
  countSelectedOptions++;
  dispatch({
    type: t.COUNT_SELECTED_OPTION,
    payload: countSelectedOptions,
  });

  if (countSelectedOptions > 1) return false;
  else return true;
};

/**
 * It takes in an object with a type, indicator and correctAnswer as parameters and returns a
 * speechSynthesisUtterance and an audio element.
 * </code>
 */
export const handleVoices = ({ type, indicator, correctAnswer }) => {
  const winningaudio = new Audio(WinningVoice);
  const losingAudio = new Audio(LosingVoice);
  let gotAnswerText = new SpeechSynthesisUtterance(
    `You are correct, ${indicator}, is the correct answer`
  );
  let failedAnswerText = new SpeechSynthesisUtterance(
    `Oh no! the correct answer is ${correctAnswer}`
  );
  const timeUpText = new SpeechSynthesisUtterance(`Oh! Sorry, time is up`);

  switch (type) {
    case "CORRECT":
      speechSynthesis.speak(gotAnswerText);
      winningaudio.addEventListener("canplaythrough", () => {
        winningaudio.play();
        setTimeout(() => {
          winningaudio.pause();
        }, 3000);
      });
      break;

    case "INCORRECT":
      speechSynthesis.speak(failedAnswerText);
      losingAudio.addEventListener("canplaythrough", () => {
        losingAudio.play();
        setTimeout(() => {
          losingAudio.pause();
        }, 3000);
      });
      break;

    case "TIMEUP":
      speechSynthesis.speak(timeUpText);
      setTimeout(() => {
        speechSynthesis.cancel();
      }, 3000);

      break;

    default:
      speechSynthesis.cancel();
      break;
  }
};

/**
 * It filters the data by difficulty and adds a number to each quiz.
 */
export const handleRenderQuizz = ({
  data,
  quizDifficulty,
  dispatch,
  quizIndex,
  t,
}) => {
  /* Filtering the data by difficulty and adding a number to each quiz. */
  let filteredQuizzByDifficulty =
    data.length > 0 &&
    data
      .filter(({ difficulty }) => difficulty === quizDifficulty)
      .map((value, idx) => {
        value.no = idx + 1;
        return value;
      });

  /* Checking if the filteredQuizzByDifficulty has a length greater than 0, if it does it will return
filteredQuizzByDifficulty, if not it will return data. */
  let adjust2DifficultyChange =
    filteredQuizzByDifficulty.length > 0 ? filteredQuizzByDifficulty : data;

  /* Dispatching the quizzes to the reducer. */
  dispatch({
    type: t.FETCH_QUIZZ,
    payload: adjust2DifficultyChange || [],
  });
  /* Dispatching the current quiz to the reducer. */
  dispatch({
    type: t.CURRENT_QUIZZ,
    payload: [adjust2DifficultyChange[quizIndex]] || [],
  });
};

export const quizDatas = [
  {
    id: 1,
    no: 1,
    type: "MULTIPLE_CHOICE",
    difficulty: "EASY",
    multiple_response: false,
    quiz: {
      question: "Which protocol is used to access webpages?",
      answers: [
        {
          a: "DNS",
          b: "FTP",
          c: "HTTP",
          d: "PDF",
        },
      ],
      correctAnswer: "c",
    },
  },
  {
    id: 2,
    no: 2,
    type: "MULTIPLE_CHOICE",
    difficulty: "MEDIUM",
    multiple_response: false,
    quiz: {
      question: "What does HTML stand for?",
      answers: [
        {
          a: "High Tech Machine Language",
          b: "Hypertext Markup Language",
          c: "Hardware Technology Marker Language",
          d: "Hard Tech Marker Language",
        },
      ],
      correctAnswer: "b",
    },
  },
  {
    id: 3,
    no: 3,
    type: "MULTIPLE_CHOICE",
    difficulty: "EASY",
    multiple_response: false,
    quiz: {
      question:
        "Which networking protocol is used to transfer files between two computers?",
      answers: [
        {
          a: "FTP",
          b: "SSH",
          c: "SMTP",
          d: "MTP",
        },
      ],
      correctAnswer: "a",
    },
  },
  {
    id: 4,
    no: 4,
    type: "MULTIPLE_CHOICE",
    difficulty: "MEDIUM",
    multiple_response: false,
    quiz: {
      question: "What company made the first color arcade game?",
      answers: [
        {
          a: "Sony",
          b: "Nintendo",
          c: "Atari",
          d: "Panasonic",
        },
      ],
      correctAnswer: "c",
    },
  },
  {
    id: 5,
    no: 5,
    type: "MULTIPLE_CHOICE",
    difficulty: "EASY",
    multiple_response: false,
    quiz: {
      question: "In computer networking, what does DNS stand for?",
      answers: [
        {
          a: "Domain Name System",
          b: "Data Network Server",
          c: "Dynamic Network System",
          d: "Data Network System",
        },
      ],
      correctAnswer: "a",
    },
  },
  {
    id: 6,
    no: 6,
    type: "MULTIPLE_CHOICE",
    difficulty: "HARD",
    multiple_response: false,
    quiz: {
      question:
        "Which popular software command is used to download a file from a web server?",
      answers: [
        {
          a: "upload",
          b: "wget",
          c: "download",
          d: "moc",
        },
      ],
      correctAnswer: "b",
    },
  },
  {
    id: 7,
    no: 7,
    type: "MULTIPLE_CHOICE",
    difficulty: "MEDIUM",
    multiple_response: false,
    quiz: {
      question: "What was the first ever message sent via morse code?",
      answers: [
        {
          a: "What Hath God Wrought",
          b: "Good Morning Victory",
          c: "You Smell",
          d: "How Are You",
        },
      ],
      correctAnswer: "a",
    },
  },
  {
    id: 8,
    no: 8,
    type: "MULTIPLE_CHOICE",
    difficulty: "HARD",
    multiple_response: false,
    quiz: {
      question: "In computing what term does the word modem come from?",
      answers: [
        {
          a: "Modern Demograph",
          b: "Mono Demo",
          c: "Modulate Demodulate",
          d: "Modulate Duo",
        },
      ],
      correctAnswer: "c",
    },
  },
  {
    id: 9,
    no: 9,
    type: "MULTIPLE_CHOICE",
    difficulty: "HARD",
    multiple_response: false,
    quiz: {
      question: "Which protocol is used to send and receive emails?",
      answers: [
        {
          a: "SMTP",
          b: "FTP",
          c: "DNS",
          d: "LFT",
        },
      ],
      correctAnswer: "a",
    },
  },
];
