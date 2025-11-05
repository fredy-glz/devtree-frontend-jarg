export type TUser = {
  handle: string;
  name: string;
  email: string;
  description: string;
  image: string;
  links: string;
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

export type TSocialNetwork = {
  _id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type TDevTreeLink = Pick<TSocialNetwork, "name" | "url" | "enabled">;
