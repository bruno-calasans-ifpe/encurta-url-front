import api from "@/lib/axios";
import { Url } from "@/types/Url.type";
import { UrlAccess } from "@/types/UrlAccess.type";

export type CreateAccessUrlInput = {
  url_id: number;
};

export default {
  async create(input: CreateAccessUrlInput) {
    const { data } = await api.post<{ message: string; urlAccess: UrlAccess }>(
      "/url-access",
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
