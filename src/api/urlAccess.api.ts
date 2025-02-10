import api from "@/lib/axios";
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
  //   async getByUrlId(urlId: string) {
  //     const { data } = await api.get<{ message: string; urlAccess: UrlAccess }>(
  //       `/url-access/${urlId}`
  //     );
  //     return data;
  //   },
};
