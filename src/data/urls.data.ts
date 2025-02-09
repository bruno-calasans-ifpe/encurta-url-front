import type { Url } from "@/types/Url.type";

export const URL_DATA: Url[] = [
  {
    id: 1,
    fullUrl: "http://my-long-url.com.br",
    shortUrl: "http://short-url",
    user_id: 1,
    accesses: [
      {
        id: 1,
        accessDate: "01-01-1998",
        ip: "192.168.0.0",
        location: "São Paulo",
        url_id: 1,
      },
      {
        id: 2,
        accessDate: "01-01-1999",
        ip: "192.168.0.1",
        location: "Minas Gerais",
        url_id: 1,
      },
      {
        id: 3,
        accessDate: "01-01-2000",
        ip: "192.168.0.3",
        location: "Minas Gerais",
        url_id: 1,
      },
    ],
  },
  {
    id: 2,
    fullUrl: "http://my-long-url.com.br",
    shortUrl: "http://short-url",
    user_id: 2,
    accesses: [
      {
        id: 1,
        accessDate: "01-01-1998",
        ip: "192.168.0.0",
        location: "São Paulo",
        url_id: 2,
      },
      {
        id: 2,
        accessDate: "01-01-1999",
        ip: "192.168.0.1",
        location: "Minas Gerais",
        url_id: 2,
      },
      {
        id: 3,
        accessDate: "01-01-2000",
        ip: "192.168.0.3",
        location: "Minas Gerais",
        url_id: 2,
      },
    ],
  },
  {
    id: 3,
    fullUrl: "http://my-long-url.com.br",
    shortUrl: "http://short-url",
    user_id: 3,
    accesses: [
      {
        id: 1,
        accessDate: "01-01-1998",
        ip: "192.168.0.0",
        location: "São Paulo",
        url_id: 3,
      },
      {
        id: 2,
        accessDate: "01-01-1999",
        ip: "192.168.0.1",
        location: "Minas Gerais",
        url_id: 3,
      },
      {
        id: 3,
        accessDate: "01-01-2000",
        ip: "192.168.0.3",
        location: "Minas Gerais",
        url_id: 3,
      },
    ],
  },
];
