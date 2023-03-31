import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GameContext } from "../../config/contexts";
import { getQuiz } from "../QueryComponent/quizQuery";
import * as t from "../../config/actions";
import styled from "styled-components";
import Options from "./Options";

const QuizLayout = () => {
  const [{ currentQuizData, quizIndex }, dispatch] = useContext(GameContext);
  const [showSkip, setShowSkip] = useState(true);

  const { isLoading, isFetching } = useQuery({
    queryKey: ["getQuiz"],
    refetchOnWindowFocus: false,
    queryFn: getQuiz,
    retry: 1,
    onError: (data) => {
      // console.log("data.response.error", data.response.error);
    },
    onSuccess: (data) => {
      dispatch({ type: t.FETCH_QUIZZ, payload: data.quizData || [] });
      dispatch({
        type: t.CURRENT_QUIZZ,
        payload: [data.quizData[quizIndex]] || [],
      });
    },
  });

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowSkip(false);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      setShowSkip(true);
    };
  }, [quizIndex]);

  if (isLoading || isFetching) return <small>...Loading</small>;
  // if (isError) return <small>Fail</small>;

  return (
    <Container>
      {currentQuizData.length > 0
        ? currentQuizData.map(
            ({
              id,
              no,
              type,
              difficulty,
              quiz: { question, answers, correctAnswer },
            }) => {
              return (
                <QuizzWrapper key={id}>
                  <header className="header">
                    <aside className="header_aside">
                      <small>{id}</small>
                      <small>{difficulty}</small>
                    </aside>

                    <h4>{question}</h4>
                  </header>

                  <Options answers={answers} correctAnswer={correctAnswer} />

                  {showSkip ? (
                    <ButtonGroup>
                      <button onClick={() => {}}>skip</button>
                    </ButtonGroup>
                  ) : (
                    false
                  )}
                </QuizzWrapper>
              );
            }
          )
        : false}
    </Container>
  );
};

const Container = styled.main`
  width: 70%;
  min-width: 300px;
  height: max-content;
  background-color: var(--main_bg_color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  @media only screen and (max-width: 500px) {
    width: 100%;
  } ;
`;

const QuizzWrapper = styled.article`
  width: 70%;
  min-width: 300px;

  .header {
    padding: 1rem;
    min-width: 300px;
    min-height: 10em;
    margin-bottom: var(--text-fs);
    background: linear-gradient(var(--main_bg_color), var(--main_bg_color))
        padding-box,
      linear-gradient(
          45deg,
          var(--box_selected_ans_color),
          var(--box_selected_ans_color_2)
        )
        border-box;
    border: 5px solid transparent;
    border-radius: 50px;

    .header_aside {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
      padding-right: 0.5rem;

      small:first-of-type {
        color: #000;
        width: 45px;
        background-color: var(--box_selected_ans_color);
        height: 2.5em;
        clip-path: circle(40%);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: var(--pointer_fs);
        font-weight: bold;
      }

      small:last-of-type {
        color: var(--color_white);
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
    h4 {
      text-align: center;
      color: var(--color_white);
      font-size: var(--text-fs);
    }
  }
`;

const ButtonGroup = styled.section`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  button {
    width: 50px;
    height: 50px;
    clip-path: circle(50%);
    border: 5px solid;
    cursor: pointer;
    background: ${(props) =>
      props.selected
        ? "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box,linear-gradient(45deg, var(--box_selected_ans_color), var(--box_selected_ans_color_2)) border-box"
        : "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box, linear-gradient(45deg, var(--box_color), var(--box_color)) border-box"};
    border: 5px solid transparent;
    border-radius: 50px;
    color: var(--color_white);
    text-transform: capitalize;
  }
`;
export default QuizLayout;
