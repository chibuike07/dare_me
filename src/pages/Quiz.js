import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import QuizLayout from "../components/QuizComponent/QuizLayout";
import { GameContext } from "../config/contexts";
import WelcomePage from "./WelcomePage";
const Quiz = () => {
  const [
    {
      quizData,
      currentQuizData,
      startQuizz,
      skippedQuiz,
      quizIndex,
      answeredQuizData,
    },
  ] = useContext(GameContext);
  const start = useRef(60);
  let timeout = useRef();
  const [timer, settimer] = useState(start.current);
  const [, setWindowSize] = useState();
  const convertLen2Int = parseInt(quizData?.length, 10);
  const convertAnsLen3Int = parseInt(answeredQuizData?.length, 10);
  const percentage =
    parseInt((convertAnsLen3Int / convertLen2Int) * 70, 10) || 0;

  useLayoutEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(() => document.children[0].scrollWidth);
    };

    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

  useEffect(() => {
    if (quizIndex || currentQuizData.length) {
      timeout.current = setInterval(() => {
        start.current--;
        settimer(start.current);
        if (start.current <= 0) {
          clearInterval(timeout);
          start.current = 60;
        }
      }, 500);
    }

    return () => {
      clearInterval(timeout.current);
      // setWindowSize()
    };
  }, [quizIndex, currentQuizData]);

  useEffect(() => {
    if (answeredQuizData || skippedQuiz) {
      start.current = 60;
      settimer(start.current);
      clearInterval(timeout.current);
    }
    return () => {};
  }, [answeredQuizData, skippedQuiz]);
  return (
    <Container>
      {!startQuizz ? <WelcomePage /> : false}{" "}
      {startQuizz ? (
        <ProgressBar percentage={percentage}>
          <small>{percentage}%</small>
        </ProgressBar>
      ) : (
        false
      )}{" "}
      <QuizWrapper>
        {startQuizz ? (
          <QuizTimeLimit starts={start}>
            <small>{timer}</small>
          </QuizTimeLimit>
        ) : (
          false
        )}
      </QuizWrapper>
      {startQuizz ? <QuizLayout /> : false}{" "}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 96vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--layout_color);
`;

const ProgressBar = styled.div`
  height: 15px;
  transition: width 1s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color_white);
  overflow-wrap: break-all;

  width: ${(props) =>
    props.percentage ? `${props.percentage}%` : `${props.percentage}%`};
  background: linear-gradient(
    40deg,
    var(--box_selected_ans_color),
    var(--box_selected_ans_color_2)
  );
  border-radius: 10px;
`;

const QuizWrapper = styled.main`
  width: 70%;
  height: max-content;
  display: flex;
  background-color: green;
`;

const QuizTimeLimit = styled.div`
  position: fixed;
  bottom: 10%;
  right: 5%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: circle(50%);
  background: ${(props) =>
    props.selected
      ? "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box,linear-gradient(45deg, var(--box_selected_ans_color), var(--box_selected_ans_color_2)) border-box"
      : "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box, linear-gradient(45deg, var(--box_color), var(--box_color)) border-box"};
  border: 5px solid transparent;
  border-radius: 50px;
  color: var(--color_white);
  font-size: var(--pointer_fs);
`;

export default Quiz;
