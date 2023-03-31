import { CustomAxios } from "../../utils/customAxios";
// import publicJson from "../../../public/quiz_data.json";

export const getQuiz = async () => {
  const result = await CustomAxios.get("http://localhost:3003/quizData").then(
    (res) => res.data
  );
  return result;
};
