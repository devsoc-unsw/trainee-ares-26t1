import { get, post } from "./request";

type HelloResponse = {
  message: string;
};

type Auth = {
  message: string;
};

type Item = {
  name: string,
  amount: number
}

type Task = {
  id: number,
  type: string, // type of the task (i.e daily, weekly, custom)
  name: string, // name of the task
  amount: number, // point
  difficulty ?: string, // Hard Easy, etc
  dayOfWk ?: number, // for weekly deadline
  deadline ?: Date // for non daily tasks
}

type User = {
  name: string,
  email: string,
  money: number,
  inventory: Item[],
  tasks: Task[],
  debtStartDate: Date
}

export const testApi = async (): Promise<HelloResponse> =>
  get<HelloResponse>('/hi');

export const authLogin = async(): Promise<Auth> =>
  get<Auth>('/auth/login');

export const authRegister = async() : Promise<Auth> =>
  post<Auth>('/auth/register');

export const fetchUser = async() : Promise<User> =>
  get<User>('/user');