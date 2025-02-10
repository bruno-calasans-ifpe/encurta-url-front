import { UrlAccess } from "./UrlAccess.type";
import { User } from "./User.type";

export type Url = {
  id: number;
  fullUrl: string;
  shortUrl: string;
  user_id: number;
  user?: User;
  accesses: UrlAccess[];
};
