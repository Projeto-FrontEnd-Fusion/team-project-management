import type { AxiosInstance } from "axios";
import type { UserProfile } from "../../../types/UserProfile";
import { createUserProfile } from "./methods/post";
import { getUserProfile } from "./methods/get";
import { putUserProfile } from "./methods/put";
import { deleteUserProfile } from "./methods/delete";

export class ServiceUserProfile {
  public create = async (api: AxiosInstance, userProfile: UserProfile) =>
    await createUserProfile(api, userProfile);

  public get = async (api: AxiosInstance) => await getUserProfile(api);

  public update = async (api: AxiosInstance, userProfile: UserProfile) =>
    await putUserProfile(api, userProfile);

  public delete = async (api: AxiosInstance, id: string) =>
    await deleteUserProfile(api, id);
}
