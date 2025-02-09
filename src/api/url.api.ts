import api from "@/lib/axios";
import { Url } from "@/types/Url.type";

type CreateUrlInput = {
  redirectUrl: string;
  fullUrl: string;
  user_id: number;
};

export default {
  async create(input: CreateUrlInput) {
    const { data } = await api.post<{ message: string; url: Url }>(
      "/url",
      input
    );
    return data;
  },
  async get(id: string) {
    const { data } = await api.get<{ message: string; url: Url }>(`/url/${id}`);
    return data;
  },
  async getByShortUrl(shortUrl: string) {
    const { data } = await api.get<{ message: string; url: Url }>(
      `/url/${shortUrl}?byShortUrl=true`
    );
    return data;
  },
};
