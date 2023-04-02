import React, { useContext } from "react";
import { GameContext } from "../../config/contexts";
import { RESET } from "../../config/actions";
import {
  FacebookShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import {
  Button,
  DisplayGameScoreBoard,
  ShareIconWrapper,
} from "../../styles/QuizFeedBack";

const QuizzFeedBack = () => {
  const [
    { correctAnsweredQuiz, quizData, doLater, answeredQuizData },
    dispatch,
  ] = useContext(GameContext);

  const handleBack2WelcomeGame = () => {
    return dispatch({ type: RESET });
  };

  return (
    <DisplayGameScoreBoard>
      <h2>your score board</h2>
      <h5>
        you scored{" "}
        {parseInt(
          `${(correctAnsweredQuiz?.length / quizData?.length) * 100}`,
          10
        )}
        % in total,{" "}
        {`${
          (correctAnsweredQuiz?.length / quizData?.length) * 100 < 50
            ? "it's below the pass mark"
            : "you made it! Congrats!!"
        }`}
      </h5>
      <details>
        <div>quiz total: {quizData?.length}</div>
        <div>
          you have: {doLater?.length} do-later{" "}
          {`${doLater?.length <= 1 ? "question" : "questions"}`} you may retake{" "}
        </div>
        <div>
          you scored a total of {`${correctAnsweredQuiz?.length}`} out of{" "}
          {`${answeredQuizData?.length} questions`}
        </div>
      </details>

      <Button onClick={() => handleBack2WelcomeGame()}>
        go back to welcome page
      </Button>
      <ShareIconWrapper>
        <WhatsappShareButton
          url={`${window.location.href}`}
          title={"Believer Quizz Score"}
          openShareDialogOnClick={true}
          className="iconWrapper"
        >
          <WhatsappIcon
            size={36}
            borderRadius={50}
            bgStyle={{ fill: "var(--box_selected_ans_color)" }}
          />
        </WhatsappShareButton>
        <FacebookShareButton
          url={`${window.location.href}`}
          title={"Believer Quizz Score"}
          openShareDialogOnClick={true}
          className="iconWrapper"
          hashtag={"#multiplechoicequiz"}
        >
          <FacebookIcon
            size={36}
            borderRadius={50}
            bgStyle={{ fill: "var(--box_selected_ans_color)" }}
          />
        </FacebookShareButton>
        <LinkedinShareButton
          url={`${window.location.href}`}
          title={"Believer Quizz Score"}
          openShareDialogOnClick={true}
          className="iconWrapper"
        >
          <LinkedinIcon
            size={36}
            borderRadius={50}
            bgStyle={{ fill: "var(--box_selected_ans_color)" }}
          />
        </LinkedinShareButton>

        <TwitterShareButton
          url={`${window.location.href}`}
          title={"Believer Quizz Score"}
          openShareDialogOnClick={true}
          className="iconWrapper"
        >
          <TwitterIcon
            size={36}
            borderRadius={50}
            bgStyle={{ fill: "var(--box_selected_ans_color)" }}
          />
        </TwitterShareButton>
      </ShareIconWrapper>
    </DisplayGameScoreBoard>
  );
};

export default QuizzFeedBack;
