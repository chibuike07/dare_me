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
