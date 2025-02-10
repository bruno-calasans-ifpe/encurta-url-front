import api from "@/lib/axios";
import { Url } from "@/types/Url.type";

type CreateUrlInput = {
  redirectUrl: string;
  fullUrl: string;
  user_id: number;
};

type EditUrlInput = Omit<Partial<CreateUrlInput>, "user_id">;

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
  async getUserUrls(userId: number) {
    const { data } = await api.get<{ message: string; urls: Url[] }>(
      `/url/user/${userId}`
    );
    return data;
  },
  async removeUrl(urlId: number) {
    const { data } = await api.delete<{ message: string; url: Url }>(
      `/url/${urlId}`
    );
    return data;
  },
  async editUrl(urlId: number, input: EditUrlInput) {
    const { data } = await api.put<{ message: string; url: Url }>(
      `/url/${urlId}`,
      input
    );
    return data;
  },
};
