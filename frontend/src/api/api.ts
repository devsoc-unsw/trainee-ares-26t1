import { get, post } from "./request";

type HelloResponse = {
  message: string;
};

type Auth = {
  message: string;
};

type Item = {
  id: number;
};

type Task = {
  id: number;
  type: string; // type of the task (i.e daily, weekly, custom)
  name: string; // name of the task
  amount: number; // point
  difficulty?: string; // Hard Easy, etc
  dayOfWk?: number; // for weekly deadline
  deadline?: Date; // for non daily tasks
};

type User = {
  id: string;
  email: string;
  money: number;
  sprite: string;

  layers: {
    layer0: (number | null)[][];
    layer1: (number | null)[][];
    layer2: (number | null)[][];
  };

  inventory: Record<string, number>;

  tasks: Task[];

  debtStartDate: string | null;
};

export const testApi = async (): Promise<HelloResponse> =>
  get<HelloResponse>("/hi");

export const authLogin = async (
  email: string,
  password: string,
): Promise<Auth> =>
  post<Auth>(
    "/auth/login",
    {
      email,
      password,
    },
    {
      "Content-Type": "application/json",
    },
  );

export const authRegister = async (
  email: string,
  password: string,
): Promise<Auth> =>
  post<Auth>(
    "/auth/register",
    {
      email,
      password,
    },
    {
      "Content-Type": "application/json",
    },
  );

export const fetchUser = async (): Promise<User> =>
  get<User>("/user/fetchUser", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const buyItem = async (id: number): Promise<Item> =>
  post<Item>(
    "/item/buy",
    {
      id,
    },
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  );
