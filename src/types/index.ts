export type TUser = {
  handle: string;
  name: string;
  email: string;
};

export type TRegisterForm = Pick<TUser, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};
