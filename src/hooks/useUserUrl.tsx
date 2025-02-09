import { useEffect, useState } from "react";
import { Url } from "@/types/Url.type";
import { URL_DATA } from "@/data/urls.data";

type UseUrlProps = {
  userId: number;
};

export default function useUserUrls({ userId }: UseUrlProps) {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUrls = () => {
    setLoading(true);
    const loadedUrls = URL_DATA.filter((url) => url.user_id === userId);
    setUrls(loadedUrls);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadUrls();
  }, [userId]);

  return {
    loading,
    urls,
    loadUrls,
  };
}
