import { api } from "../axiosInstance";

export const getSkills = async () => {
  const { data } = await api.get("/skills");
  return data;
};