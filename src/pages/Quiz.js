import React, { useContext, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import QuizLayout from "../components/QuizComponent/QuizLayout";
import { GameContext } from "../config/contexts";
import WelcomePage from "./WelcomePage";
const Quiz = () => {
  const [{ quizData, startQuizz, answeredQuizData }] = useContext(GameContext);
  const [, setWindowSize] = useState();
  const convertLen2Int = parseInt(quizData?.length, 10);
  const convertAnsLen3Int = parseInt(answeredQuizData?.length, 10);
  const percentage = parseInt((convertAnsLen3Int / convertLen2Int) * 70, 10);

  useLayoutEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(() => document.children[0].scrollWidth);
    };

    window.addEventListener("resize", handleWindowSizeChange);
  }, []);

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

export default Quiz;
