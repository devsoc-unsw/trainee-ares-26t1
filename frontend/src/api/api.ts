import { get } from "./request";

type HelloResponse = {
  message: string;
};

export const testApi = async (): Promise<HelloResponse> => 
  get<HelloResponse>('/hi');