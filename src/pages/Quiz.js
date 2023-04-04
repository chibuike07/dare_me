import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import QuizLayout from "../components/QuizComponent/QuizLayout";
import QuizzFeedBack from "../components/QuizComponent/QuizzFeedBack";
import * as t from "../config/actions";
import { GameContext } from "../config/contexts";
import WelcomePage from "./WelcomePage";
import BgImage from "../assets/quizBg.png";
import {
  handleDoubleSelects,
  handleNextQuiz,
  handleVoices,
} from "../utils/helpers";
import {
  Container,
  ProgressBar,
  QuizTimeLimit,
  QuizWrapper,
  TimeLimitWrapper,
} from "../styles/Quiz";
const Quiz = () => {
  let [
    {
      quizData,
      currentQuizData,
      startQuizz,
      doLater,
      quizIndex,
      answeredQuizData,
      correctAnsweredQuiz,
      showFeedBack,
      countSelectedOptions,
    },
    dispatch,
  ] = useContext(GameContext);

  const start = useRef(60);
  let timeout = useRef();
  const [timer, setTimer] = useState(start.current);
  const convertLen2Int = parseInt(quizData?.length, 10);
  const convertAnsLen3Int = parseInt(answeredQuizData?.length, 10);
  const percentage =
    parseInt((convertAnsLen3Int / convertLen2Int) * 100, 10) || 0;

  useEffect(() => {
    if (quizIndex || currentQuizData.length) {
      timeout.current = setInterval(() => {
        start.current--;
        setTimer(start.current);
        if (start.current <= 0) {
          handleDoubleSelects({ dispatch, countSelectedOptions, t });
          start.current = 60;
          clearInterval(timeout.current);
          dispatch({
            type: t.ANSWERED_QUIZZ,
            payload: quizData[quizIndex]?.id,
          });

          handleVoices({ type: "TIMEUP" });
          setTimeout(() => {
            handleNextQuiz({
              correctAnsweredQuiz,
              currentQuizData,
              dispatch,
              quizData,
              quizIndex,
              answeredQuizData,
              doLater,
            });
          }, 3000);
        }
      }, 500);
    }

    return () => {
      clearInterval(timeout.current);
    };
  }, [quizIndex, currentQuizData]);

  useEffect(() => {
    if (answeredQuizData || doLater) {
      start.current = 60;
      setTimer(start.current);
      clearInterval(timeout.current);
    }
  }, [answeredQuizData, doLater]);

  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(to bottom , var(--layout_color) 40%, var(--layout_color2)), url(${BgImage})`,
      }}
    >
      {!startQuizz ? <WelcomePage /> : false}{" "}
      <TimeLimitWrapper>
        {!showFeedBack && startQuizz ? (
          <QuizTimeLimit starts={start}>
            <small>{timer}</small>
          </QuizTimeLimit>
        ) : (
          false
        )}
      </TimeLimitWrapper>
      <QuizWrapper>
        {!showFeedBack && startQuizz ? (
          <ProgressBar percentage={percentage}></ProgressBar>
        ) : (
          false
        )}{" "}
        {!showFeedBack && startQuizz ? <QuizLayout /> : false}
      </QuizWrapper>
      {startQuizz && showFeedBack ? <QuizzFeedBack /> : false}
    </Container>
  );
};

export default Quiz;
