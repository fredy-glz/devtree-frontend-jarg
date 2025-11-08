import { isAxiosError } from "axios";

import api from "../config/axios";
import { TUser, TUserHandle } from "../types";

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

export const updateProfile = async (formData: TUser): Promise<string> => {
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

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await api.post("/user/image", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Ha ocurrido un error");
  }
};

export const getUserByHandle = async (handle: string) => {
  try {
    const { data } = await api.get<TUserHandle>(`/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
    throw new Error("Ha ocurrio un error");
  }
};

export const searchByHandle = async (handle: string) => {
  try {
    const { data } = await api.post<string>("/search", { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
    throw new Error("Ha ocurrido un error");
  }
};
