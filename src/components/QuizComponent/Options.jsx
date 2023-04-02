import OptionsList from "./OptionsList";
import { Answers } from "../../styles/Option";

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

export default Options;
