import { formMemberData } from "../../schema/schemaFormValidation";
import { api } from "../axiosInstance";


export const sendMemberData = async (formData: formMemberData) => {
  const { data } = await api.post("/members", formData);
  return data;
};