import { api } from "../axiosInstance";

export const getSoftskills = async () => {
  const { data } = await api.get("/softSkills");
  return data;
};