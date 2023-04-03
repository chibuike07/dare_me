import React, { useContext } from "react";
import * as t from "../config/actions";
import { GameContext } from "../config/contexts";
import { _difficulty } from "../utils/helpers";
import {
  Container,
  SelectDifficulty,
  WelComeButton,
} from "../styles/WelcomePage";

const WelcomePage = () => {
  const [{ quizDifficulty }, dispatch] = useContext(GameContext);

  const handleSelectDifficulty = (e) => {
    dispatch({ type: t.GET_DIFFICULTY, payload: e.target.value });
  };

  return (
    <Container>
      <section className="section">
        <h2>
          hello there! <br /> You are welcome to the Belivers Quizz
        </h2>
        <p>Click on the button below to navigate to the game view.</p>

        <small>I hope you will enjoy your time.</small>
      </section>

      <WelComeButton>
        <button
          onClick={() => dispatch({ type: t.START_QUIZZ, payload: true })}
        >
          start your quiz here
        </button>

        <SelectDifficulty
          title="Select difficulty"
          onChange={(e) => handleSelectDifficulty(e)}
          value={quizDifficulty}
        >
          <option value={"RANDOM"}>RANDOM</option>
          {_difficulty?.length > 0
            ? _difficulty.map((difficulty, idx) => {
                return (
                  <option key={idx} value={difficulty}>
                    {difficulty}
                  </option>
                );
              })
            : false}
        </SelectDifficulty>
      </WelComeButton>
    </Container>
  );
};

export default WelcomePage;
