import { get, post } from "./request";

type HelloResponse = {
  message: string;
};

type Auth = {
  message: string;
};

type User = {
  name: string,
  email: string,
  meowBucks: number
}

export const testApi = async (): Promise<HelloResponse> =>
  get<HelloResponse>('/hi');

export const authLogin = async(): Promise<Auth> =>
  get<Auth>('/auth/login');

export const authRegister = async() : Promise<Auth> =>
  post<Auth>('/auth/register');

export const fetchUser = async() : Promise<User> =>
  get<User>('/user');