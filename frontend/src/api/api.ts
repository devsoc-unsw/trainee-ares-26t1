import { get, post, put } from "./request";

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

export type User = {
  id: string;
  email: string;
  money: number;
  sprite: string;

  layers: {
    layer0: (number | null)[][];
    layer1: (number | null)[][];
    layer2: (number | null)[][];
  };

  inventory: Record<number, number>;

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

export const fetchUser = async (): Promise<User> => {
  const res = await get<{ user: any }>("/user/fetchUser");
  const raw = res.user;
  return { ...raw, inventory: toInventoryRecord(raw.inventory) };
};

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const payload = {
    ...data,
    ...(data.inventory && { inventory: toInventoryArray(data.inventory) }),
  };
  const res = await put<{ user: any }>("/user/update", payload);
  return { ...res.user, inventory: toInventoryRecord(res.user.inventory) };
};

export const buyItem = async (id: number): Promise<User> => {
  const res = await post<{ user: any }>("/item/buy", { id });
  return { ...res.user, inventory: toInventoryRecord(res.user.inventory) };
};

const toInventoryRecord = (
  inventory: { tileId: number; count: number }[],
): Record<number, number> =>
  Object.fromEntries(inventory.map(({ tileId, count }) => [tileId, count]));

const toInventoryArray = (
  inventory: Record<number, number>,
): { tileId: number; count: number }[] =>
  Object.entries(inventory).map(([tileId, count]) => ({
    tileId: Number(tileId),
    count,
  }));

  export type CreateTaskPayload =
  | { name: string; type: "Daily" }
  | { name: string; type: "Weekly"; dayOfWk: number; deadline?: string }
  | { name: string; type: "Custom"; difficulty: "easy" | "medium" | "hard"; deadline: string };

export const createTask = async (payload: CreateTaskPayload): Promise<Task> =>
  post<Task>("/task/create", payload);