import React, { useContext } from "react";
import styled from "styled-components";
import { START_QUIZZ } from "../config/actions";
import { GameContext } from "../config/contexts";

const WelcomePage = () => {
  const [, dispatch] = useContext(GameContext);
  return (
    <Container>
      <section className="section">
        <h2>hello there! you are welcome to the Belivers Quizz</h2>
        <p>Click on the button below to navigate to the game view.</p>

        <small>I hope you will enjoy your time.</small>
      </section>

      <WelComeButton>
        <button onClick={() => dispatch({ type: START_QUIZZ, payload: true })}>
          start your quiz here
        </button>
      </WelComeButton>
    </Container>
  );
};

const Container = styled.article`
  width: 50%;
  min-height: 20vh;
  min-width: 300px;
  background-color: var(--main_bg_color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--text-fs);
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
  @media only screen and (max-width: 786) {
    flex-grow: 0.7;
  }

  .section {
    min-height: 10em;
    padding: var(--text-fs);
    text-align: center;
    margin-bottom: var(--text-fs);
    h2 {
      font-size: var(--pointer_fs);
      &::first-letter {
        text-transform: uppercase;
        font-size: 4rem;
      }
    }
    & :is(h2, p, small) {
      color: var(--color_white);
      text-align: center;
    }
  }
`;
const WelComeButton = styled.div`
  text-align: center;
  button {
    padding: 0.5rem;
    background: linear-gradient(
        45deg,
        var(--box_selected_ans_color),
        var(--box_selected_ans_color_2)
      )
      border-box;
    border-radius: 10px;
    color: var(--color_white);
    ::first-letter {
      text-transform: uppercase;
    }
    cursor: pointer;
  }
`;

export default WelcomePage;
