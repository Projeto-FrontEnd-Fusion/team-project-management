import type { AxiosInstance } from "axios";
import type { UserProfile } from "../../../../types/UserProfile";

export const createUserProfile = async (
  api: AxiosInstance,
  userProfile: UserProfile
) => {
  const response = await api.post("/api/create", userProfile);
  return response;
};
