import { CustomAxios } from "../../utils/customAxios";

export const getQuiz = async () => {
  const result = await CustomAxios.get("/quiz_data.json").then(
    (res) => res.data
  );

  return result;
};
