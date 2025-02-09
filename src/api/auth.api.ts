import api from "@/lib/axios";
import { User } from "@/types/User.type";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export default {
  async register(input: RegisterInput) {
    const { data } = await api.post<{ user: User }>("/auth/register", input);
    return data;
  },
  async login(input: LoginInput) {
    const { data } = await api.post<{ accessToken: string; user: User }>(
      "/auth/login",
      input
    );
    return data;
  },
  async checkAuth(accessToken: string) {
    return api.get<{ message: string; user: User }>("/auth/check", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
