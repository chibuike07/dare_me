import React, { useContext, useEffect, useState } from "react";
import * as t from "../../config/actions";
import { GameContext } from "../../config/contexts";
import {
  handleDoubleSelects,
  handleNextQuiz,
  handleVoices,
} from "../../utils/helpers";
import { Lists } from "../../styles/OptionList";

const OptionsList = ({ options, indicator, correctAnswer }) => {
  let [
    {
      quizData,
      quizIndex,
      currentQuizData,
      correctAnsweredQuiz,
      countSelectedOptions,
      doLater,
      answeredQuizData,
    },
    dispatch,
  ] = useContext(GameContext);
  const [selected, setSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  // console.log("selectedAnswer :>> top", selectedAnswer);
  /**
   * If the user has already selected an answer, then don't let them select another one.
   */
  const handleSelectedAnswer = async ({ text }) => {
    const doubleclickCheck = handleDoubleSelects({
      dispatch,
      countSelectedOptions,
      t,
    });

    if (!doubleclickCheck) return;

    setSelected(() => true);
    setSelectedAnswer(() => text);
    dispatch({ type: t.ANSWERED_QUIZZ, payload: quizData[quizIndex]?.id });
  };

  useEffect(() => {
    /**
     * If the selected answer is correct, then dispatch a correct answer action, otherwise, if the
     * selected answer is incorrect, then dispatch an incorrect answer action.
     */
    const handleCorrectAnswer = () => {
      if (
        selectedAnswer &&
        selectedAnswer.toLocaleLowerCase() === correctAnswer
      ) {
        handleVoices({ type: "CORRECT", correctAnswer, indicator });
        dispatch({
          type: t.CORRECT_ANSWERED_QUIZZ,
          payload: quizData[quizIndex]?.id,
        });
      } else if (
        selectedAnswer &&
        selectedAnswer.toLocaleLowerCase() !== correctAnswer
      ) {
        handleVoices({ type: "INCORRECT", correctAnswer, indicator });
      }
    };
    handleCorrectAnswer();

    if (selectedAnswer) {
      setTimeout(() => {
        handleNextQuiz({
          correctAnsweredQuiz,
          countSelectedOptions,
          currentQuizData,
          dispatch,
          quizData,
          doLater,
          answeredQuizData,
          quizIndex,
        });
      }, 5000);
    }
  }, [selectedAnswer]);
  return (
    <Lists
      correctAnswer={correctAnswer}
      selected={selected}
      selectedAnswer={selectedAnswer}
      onClick={() =>
        handleSelectedAnswer({
          text: indicator,
        })
      }
    >
      <p className="indicator">{indicator}</p>

      <p className="indicator_text">{options[indicator]}</p>
    </Lists>
  );
};

export default OptionsList;
