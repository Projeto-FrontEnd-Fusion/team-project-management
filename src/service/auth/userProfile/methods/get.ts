import type { AxiosInstance } from "axios";
import type { UserProfile } from "../../../../types/UserProfile";

export const getUserProfile = async (
  api: AxiosInstance
): Promise<UserProfile[] | Error> => {
  const response = await api.get("/api/users");
  const users = response.data;
  return users;
};
