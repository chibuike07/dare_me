import styled from "styled-components";

export const DisplayGameScoreBoard = styled.aside`
  color: #fff;
  padding: 1rem;
  min-width: 300px;
  min-height: 20em;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  h2 {
    text-transform: capitalize;
  }

  h5 {
    text-align: center;
  }
  details {
    /* margin: 1rem 0rem; */
  }
`;
export const Button = styled.button`
  color: #fff;
  padding: 0.5rem;
  /* margin-bottom: 1rem; */
  background: linear-gradient(
      45deg,
      var(--box_selected_ans_color),
      var(--box_selected_ans_color_2)
    )
    border-box;
  border-radius: 10px;
  border: 0;
  color: var(--color_white);
  ::first-letter {
    text-transform: uppercase;
  }
  cursor: pointer;
`;

export const ShareIconWrapper = styled.nav`
  display: flex;
  min-height: max-content;
  justify-content: space-evenly;
  align-items: center;

  width: 200px;
  border-radius: 10px;
  border: 0;

  .iconWrapper {
    height: 100%;
    display: flex;
    align-items: center;
    transition: transform 500ms ease-in-out;
    :hover {
      transform: translateY(10%);
    }
  }
`;
