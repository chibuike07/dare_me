import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ProgressBar = styled.div`
  height: 15px;
  transition: width 1s linear;
  width: ${(props) =>
    props.percentage ? `${props.percentage}%` : `${props.percentage}%`};
  background: linear-gradient(
    40deg,
    var(--box_selected_ans_color),
    var(--box_selected_ans_color_2)
  );
  border-radius: 10px;
`;

export const TimeLimitWrapper = styled.aside`
  width: 70%;
  height: max-content;
  display: flex;
`;

export const QuizTimeLimit = styled.div`
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

export const QuizWrapper = styled.main`
  width: 70%;
  @media only screen and (max-width: 500px) {
    width: 100%;
  } ;
`;
