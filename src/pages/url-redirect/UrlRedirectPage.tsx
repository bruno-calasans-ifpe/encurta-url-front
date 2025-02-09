import Overlay from "@/components/custom/Overlay";
import TextLoader from "@/components/custom/TextLoader";
import UrlError from "@/components/custom/UrlError";
import useUrl from "@/hooks/useUrl";
import { useEffect } from "react";
import { useParams } from "react-router";

type UrlRedirectPageProps = {};

export default function UrlRedirectPage({}: UrlRedirectPageProps) {
  const { urlId } = useParams();
  const { url, loading, error } = useUrl({ urlId: +urlId! });

  useEffect(() => {
    if (url) {
      console.log(url);
      window.location.replace(url.fullUrl);
    }
  }, [url]);

  if (loading) {
    return (
      <Overlay>
        <TextLoader title="Carregando..." />;
      </Overlay>
    );
  }

  if (error) {
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
