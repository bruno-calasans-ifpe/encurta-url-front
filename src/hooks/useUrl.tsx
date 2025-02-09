import { useEffect, useState } from "react";
import { Url } from "@/types/Url.type";
import { URL_DATA } from "@/data/urls.data";

type UseUrlProps = {
  urlId: number;
};

export default function useUrl({ urlId }: UseUrlProps) {
  const [url, setUrl] = useState<Url | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadUrl = () => {
    setLoading(true);

    const foundUrl = URL_DATA.find((url) => url.id === urlId);

    if (!foundUrl) setError(true);
    else setUrl(foundUrl);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadUrl();
  }, [urlId]);

  return {
    loading,
    url,
    error,
    loadUrl,
  };
}
