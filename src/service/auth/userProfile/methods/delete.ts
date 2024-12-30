import type { AxiosInstance } from "axios";
export const deleteUserProfile = async (api: AxiosInstance, id: string) => {
  const response = await api.put("/api/delete", id);
  return response.data;
};
