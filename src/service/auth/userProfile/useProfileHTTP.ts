import { setupUserProfile } from "./setup";

const url_api = import.meta.env.VITE_USER_PROFILE || "http://localhost/3000";

export const useHttpUserProfile = () => {
  const api = setupUserProfile(url_api);
  return api;
};
