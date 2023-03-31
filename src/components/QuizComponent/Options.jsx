import styled from "styled-components";
import OptionsList from "./OptionsList";

const Options = ({ answers, correctAnswer }) => {
  return (
    <Answers>
      {answers.length > 0
        ? answers.map((options) => {
            const optionsKeys = Object.keys(options);
            return (
              optionsKeys &&
              optionsKeys.map((indicator, keyIdx) => {
                return (
                  <OptionsList
                    indicator={indicator}
                    key={keyIdx}
                    options={options}
                    correctAnswer={correctAnswer}
                  />
                );
              })
            );
          })
        : false}
    </Answers>
  );
};

const Answers = styled.article`
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export default Options;
