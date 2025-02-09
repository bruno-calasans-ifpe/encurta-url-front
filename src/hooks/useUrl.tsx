import { useEffect, useState } from "react";
import { Url } from "@/types/Url.type";
import urlApi from "@/api/url.api";

type UseUrlProps = {
  urlId: string | number;
};

export default function useUrl({ urlId }: UseUrlProps) {
  const [url, setUrl] = useState<Url | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadUrl = async () => {
    setLoading(true);

    try {
      const { url: foundUrl } = await urlApi.get(urlId);
      setUrl(foundUrl);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
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
