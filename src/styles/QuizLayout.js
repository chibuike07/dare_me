import styled from "styled-components";

export const Container = styled.article`
  width: 100%;
  min-height: 70vh;
  min-width: 300px;
  height: max-content;
  background-color: var(--main_bg_color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  @media only screen and (max-width: 600px) {
    flex-grow: 1;
  } ;
`;

export const QuizzWrapper = styled.article`
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

export const ButtonGroup = styled.section`
  margin-top: 2rem;
  position: fixed;
  bottom: 20%;
  right: 5%;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: move 1s ease-in-out;
  @keyframes move {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-30%);
    }
  }

  @media only screen and (max-width: 620px) {
    right: 30%;
    bottom: 5%;
  }
  button {
    width: 50px;
    height: 50px;
    clip-path: circle(50%);
    margin: 0rem 0.5rem;
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
