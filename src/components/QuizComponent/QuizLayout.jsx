import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GameContext } from "../../config/contexts";
import { getQuiz } from "../QueryComponent/quizQuery";
import * as t from "../../config/actions";
import Options from "./Options";
import {
  handleDoubleSelects,
  handleNextQuiz,
  handleRenderQuizz,
} from "../../utils/helpers";
import { ANSWERED_QUIZZ } from "../../config/actions";
import { ButtonGroup, Container, QuizzWrapper } from "../../styles/QuizLayout";

const QuizLayout = () => {
  let [
    {
      currentQuizData,
      correctAnsweredQuiz,
      quizData,
      quizIndex,
      doLater,
      answeredQuizData,
      countSelectedOptions,
      quizDifficulty,
    },
    dispatch,
  ] = useContext(GameContext);
  const [showSkip, setShowSkip] = useState(true);
  const { isLoading, isFetching } = useQuery({
    queryKey: ["getQuiz"],
    refetchOnWindowFocus: false,
    queryFn: getQuiz,
    retry: 1,
    onError: (err) => {
      console.error("err", err);
    },
    onSuccess: (data) => {
      console.log("data", data);
      return handleRenderQuizz({
        data,
        quizDifficulty,
        quizIndex,
        t,
        dispatch,
      });
    },
  });

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShowSkip(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      setShowSkip(true);
    };
  }, [quizIndex]);

  /**
   * "If the user double clicks on the skip button, then dispatch an action to the reducer, and then
   * after 1 second, call the handleNextQuiz function."
   *
   */
  const handleSkipQuiz = () => {
    const doubleclickCheck = handleDoubleSelects({
      dispatch,
      countSelectedOptions,
      t,
    });

    if (!doubleclickCheck) return;

    dispatch({ type: ANSWERED_QUIZZ, payload: quizData[quizIndex]?.id });
    setTimeout(() => {
      handleNextQuiz({
        correctAnsweredQuiz,
        currentQuizData,
        dispatch,
        quizData,
        quizIndex,
        doLater,
        answeredQuizData,
      });
    }, 1000);
  };

  /**
   * "If the user double clicks on the skip button, then dispatch an action to the reducer, and then
   * after 1 second, call the handleNextQuiz function."
   *
   */
  const handleComeBackLater = () => {
    const doubleclickCheck = handleDoubleSelects({
      dispatch,
      countSelectedOptions,
      t,
    });

    if (!doubleclickCheck) return;

    dispatch({ type: ANSWERED_QUIZZ, payload: quizData[quizIndex]?.id });
    dispatch({ type: t.DO_LATER, payload: currentQuizData[0]?.id });
    setTimeout(() => {
      handleNextQuiz({
        correctAnsweredQuiz,
        currentQuizData,
        dispatch,
        quizData,
        quizIndex,
        doLater,
        answeredQuizData,
      });
    }, 1000);
  };

  if (isLoading || isFetching)
    return <small style={{ textAlign: "center" }}>...Loading</small>;

  return (
    <>
      {!isLoading && (
        <Container>
          {currentQuizData?.length > 0
            ? currentQuizData.map(
                ({
                  id,
                  no,
                  difficulty,
                  quiz: { question, answers, correctAnswer },
                }) => {
                  return (
                    <QuizzWrapper key={id}>
                      <header className="header">
                        <aside className="header_aside">
                          <small>{no}</small>
                          <small>{difficulty}</small>
                        </aside>

                        <h4>{question}</h4>
                      </header>

                      <Options
                        answers={answers}
                        correctAnswer={correctAnswer}
                      />

                      {showSkip ? (
                        <ButtonGroup>
                          <button onClick={() => handleComeBackLater()}>
                            later
                          </button>
                          <button onClick={() => handleSkipQuiz()}>skip</button>
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
      )}
    </>
  );
};

export default QuizLayout;
