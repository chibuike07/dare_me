import { CustomAxios } from "../../utils/customAxios";

export const getQuiz = async () => {
  const result = await CustomAxios.get("/quizData", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);
  return result;
};
