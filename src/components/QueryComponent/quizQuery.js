import { CustomAxios } from "../../utils/customAxios";

export const getQuiz = async () => {
  const result = await CustomAxios.get("/quizData").then((res) => res.data);
  return result;
};
