import api from "@/lib/axios";

type RegisterInput = {
  email: string;
  password: string;
};

export default {
  async register(input: RegisterInput) {
    try {
      const { data } = await api.post("/auth/register", input);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async login(input: RegisterInput) {
    return api.post("/auth/login", input);
  },
};
