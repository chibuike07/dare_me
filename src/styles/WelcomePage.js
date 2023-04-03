import styled from "styled-components";

export const Container = styled.article`
  width: 70%;
  min-width: 300px;
  min-height: 20vh;
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
  @media (max-width: 768px) {
    flex: 0.6;
  }
`;
export const WelComeButton = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 0.5rem;
    margin-right: 0.5rem;
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

export const SelectDifficulty = styled.select`
  width: 100px;
  padding: 0.3rem;
  color: red;
  background: linear-gradient(
    to top,
    var(--box_selected_ans_color),
    var(--box_selected_ans_color_2)
  );
  border-radius: 10px;
  border: 5px solid transparent;
  color: var(--color_white);
  outline: none;

  option {
    color: #000;
  }
`;
