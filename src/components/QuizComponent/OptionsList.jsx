import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  ANSWERED_QUIZZ,
  CORRECT_ANSWERED_QUIZZ,
  CURRENT_QUIZZ,
  QUIZZ_INDEX,
  START_QUIZZ,
} from "../../config/actions";
import { GameContext } from "../../config/contexts";
import WinningVoice from "../../assets/winner.wav";
import LosingVoice from "../../assets/loser.wav";
import SlightlyVoice from "../../assets/slight_victory.wav";

let countSelectedOptions = 0;
const OptionsList = ({ options, indicator, correctAnswer }) => {
  let [
    { quizData, quizIndex, currentQuizData, correctAnsweredQuiz },
    dispatch,
  ] = useContext(GameContext);
  const [selected, setSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelectedAnswer = ({ text }) => {
    countSelectedOptions++;
    let utterance = new SpeechSynthesisUtterance(
      "You can only select one at a time."
    );

    if (countSelectedOptions > 1) return speechSynthesis.speak(utterance);
    setSelected(() => true);
    setSelectedAnswer(() => text);
    dispatch({ type: ANSWERED_QUIZZ, payload: quizData[quizIndex]?.id });
  };

  useEffect(() => {
    const handleCorrectAnswer = () => {
      let gotAnswer = new SpeechSynthesisUtterance(
        `You are correct, ${indicator}, is the correct answer`
      );
      let failedAnswer = new SpeechSynthesisUtterance(
        `Oh no! the correct answer is ${correctAnswer}`
      );

      if (
        selectedAnswer &&
        selectedAnswer.toLocaleLowerCase() === correctAnswer
      ) {
        const winningaudio = new Audio(WinningVoice);
        winningaudio.addEventListener("canplaythrough", () => {
          winningaudio.play();
          speechSynthesis.speak(gotAnswer);
          setTimeout(() => {
            winningaudio.pause();
          }, 4000);
        });
        dispatch({
          type: CORRECT_ANSWERED_QUIZZ,
          payload: quizData[quizIndex]?.id,
        });
      } else if (
        selectedAnswer &&
        selectedAnswer.toLocaleLowerCase() !== correctAnswer
      ) {
        const losingAudio = new Audio(LosingVoice);
        losingAudio.addEventListener("canplaythrough", () => {
          losingAudio.play();
          speechSynthesis.speak(failedAnswer);
          //   speechSynthesis.speak(gotAnswer);
          setTimeout(() => {
            losingAudio.pause();
          }, 4000);
        });
      }
    };
    handleCorrectAnswer();

    /**
     * It's a function that handles the next quiz.
     */
    const handleNextQuiz = () => {
      let finishedText = new SpeechSynthesisUtterance(
        `woa! you have reached to the end of the quiz with ${correctAnsweredQuiz?.length}`
      );

      if (currentQuizData[0]?.no === quizData[quizData.length - 1]?.no) {
        const completeSuccessAudio = new Audio(SlightlyVoice);
        completeSuccessAudio.addEventListener("canplaythrough", () => {
          completeSuccessAudio.play();
          speechSynthesis.speak(finishedText);
          setTimeout(() => {
            completeSuccessAudio.pause();
          }, 4000);
        });
        // dispatch()
        dispatch({ type: QUIZZ_INDEX, payload: 0 });
        dispatch({
          type: CURRENT_QUIZZ,
          payload: [quizData[0]],
        });

        return dispatch({ type: START_QUIZZ, payload: false });
      }
      let _quizIndex = quizIndex;
      _quizIndex = _quizIndex + 1;
      _quizIndex = _quizIndex % quizData.length;
      dispatch({ type: QUIZZ_INDEX, payload: _quizIndex });
      dispatch({
        type: CURRENT_QUIZZ,
        payload: [quizData[_quizIndex]],
      });
      countSelectedOptions = 0;
    };

    if (selectedAnswer) {
      setTimeout(handleNextQuiz, 5000);
      setSelectedAnswer("");
      setSelectedAnswer(false);
    }
    return () => {
      setSelectedAnswer("");
      setSelectedAnswer(false);
    };
  }, [
    selectedAnswer,
    correctAnswer,
    dispatch,
    quizData,
    correctAnsweredQuiz?.length,
    indicator,
    currentQuizData,
    quizIndex,
  ]);

  return (
    <>
      <Lists
        selected={selected}
        onClick={() =>
          handleSelectedAnswer({
            text: indicator,
          })
        }
      >
        <p className="indicator">{indicator}</p>

        <p className="indicator_text">{options[indicator]}</p>
      </Lists>
    </>
  );
};

const Lists = styled.div`
  height: 4em;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border: 5px solid;
  cursor: pointer;
  transition: border 2s ease-in-out;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box,linear-gradient(45deg, var(--box_selected_ans_color), var(--box_selected_ans_color_2)) border-box"
      : "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box, linear-gradient(45deg, var(--box_color), var(--box_color)) border-box"};
  border: 5px solid transparent;
  border-radius: 50px;

  .indicator {
    color: #000;
    width: 40px;
    background-color: var(--box_correct_ans_color);
    height: 2.5em;
    clip-path: circle(40%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--pointer_fs);
    font-weight: bold;
    background-color: ${(props) =>
      props.selected ? "var(--box_selected_ans_color)" : "var(--box_color)"};
    margin-right: 1rem;
    text-transform: uppercase;
  }

  .indicator_text {
    /* width: 30%; */
    color: var(--color_white);
    /* background-color: ${(props) =>
      props.selected ? "var(--box_selected_ans_color)" : "var(--box_color)"}; */
  }
`;
export default OptionsList;
