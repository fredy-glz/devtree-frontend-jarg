import { isAxiosError } from "axios";

import api from "../config/axios";
import { TProfileForm, TUser } from "../types";

export const getUser = async (): Promise<TUser> => {
  try {
    const { data } = await api.get<TUser>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Ha ocurrido un error");
  }
};

export const updateProfile = async (
  formData: TProfileForm
): Promise<string> => {
  try {
    const { data } = await api.patch<string>("/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Ha ocurrido un error");
  }
};
