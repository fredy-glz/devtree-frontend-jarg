export type TUser = {
  handle: string;
  name: string;
  email: string;
  description: string;
  _id: string;
};

export type TRegisterForm = Pick<TUser, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<TUser, "email"> & {
  password: string;
};

export type TProfileForm = Pick<TUser, "handle" | "description">;
