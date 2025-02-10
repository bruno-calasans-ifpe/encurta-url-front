/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import urlApi from "@/api/url.api";
import urlAccessApi from "@/api/urlAccess.api";
import Overlay from "@/components/custom/Overlay";
import TextLoader from "@/components/custom/TextLoader";
import UrlError from "@/components/custom/UrlError";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function UrlRedirectPage() {
  const { urlId } = useParams();

  // Pega a URL
  const {
    data: urlData,
    isLoading: urlLoading,
    error: urlError,
  } = useQuery({
    queryKey: ["getUrl", urlId],
    queryFn: () => urlApi.getByShortUrl(urlId!),
  });

  // Cria acesso para url
  const {
    data: urlAccessData,
    isLoading: urlAccessLoading,
    error: urlAccessError,
  } = useQuery({
    queryKey: ["create-access", urlId],
    queryFn: () => urlAccessApi.create({ url_id: urlData?.url.id! }),
    enabled: !!urlData,
  });

  const redirectToUrl = async () => {
    if (!urlData || !urlAccessData) return;
    window.location.replace(urlData.url.fullUrl);
  };

  useEffect(() => {
    redirectToUrl();
  }, [urlData, urlAccessData]);

  if (urlLoading || urlAccessLoading) {
    return (
      <Overlay>
        <TextLoader title="Redirecionando..." />;
      </Overlay>
    );
  }

  if (urlError || urlAccessError) {
    return (
      <Overlay>
        <UrlError
          title="Erro ao tentar redirecionar essa url"
          subtitle="URL não encontrada ou você não tem permissão o suficiente para acessá-la"
        />
      </Overlay>
    );
  }

  return (
    <Overlay>
      <TextLoader title="Redirecionando..." />;
    </Overlay>
  );
}
