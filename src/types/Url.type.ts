import { UrlAccess } from "./UrlAccess.type";

export type Url = {
  id: number;
  fullUrl: string;
  shortUrl: string;
  user_id: number;
  accesses: UrlAccess[];
};
