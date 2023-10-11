import { CustomAxios } from "../../utils/customAxios";
import { quizDatas } from "../../utils/helpers";

export const getQuiz = async () => {
  const result = await CustomAxios.get("/quizData").then((res) => res.data);
  return quizDatas;
};
