import type { AxiosInstance } from "axios";
import type { UserProfile } from "../../../../types/UserProfile";

export const putUserProfile = async (
  api: AxiosInstance,
  userProfile: Partial<UserProfile>
): Promise<UserProfile[]> => {
  const response = await api.put("/api/update", userProfile);
  return response.data;
};
