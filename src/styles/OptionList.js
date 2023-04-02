import styled from "styled-components";

export const Lists = styled.div`
  height: 4em;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border: 5px solid;
  cursor: pointer;
  transition: border 2s ease-in-out;
  background: ${(props) =>
    props.selected
      ? "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box,linear-gradient(45deg, var(--box_selected_ans_color), var(--box_selected_ans_color_2)) border-box"
      : "linear-gradient(var(--main_bg_color), var(--main_bg_color)) padding-box, linear-gradient(45deg, var(--box_color), var(--box_color)) border-box"};
  border: 5px solid transparent;
  border-radius: 50px;

  .indicator {
    color: #000;
    width: 40px;
    background-color: var(--box_correct_ans_color);
    height: 2.5em;
    clip-path: circle(40%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--pointer_fs);
    font-weight: bold;
    background-color: ${(props) =>
      props.selected ? "var(--box_selected_ans_color)" : "var(--box_color)"};
    margin-right: 1rem;
    text-transform: uppercase;
  }

  .indicator_text {
    /* width: 30%; */
    color: var(--color_white);
    /* background-color: ${(props) =>
      props.selected ? "var(--box_selected_ans_color)" : "var(--box_color)"}; */
  }
`;
