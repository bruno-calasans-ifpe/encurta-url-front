import { redirect, useParams } from "react-router";
import UrlInfo from "@/components/url/UrlInfo";
import UrlOtherActions from "../../components/url/UrlOtherActions";
import UrlTitle from "@/components/url/UrlTitle";
import UrlError from "@/components/custom/UrlError";
import TextLoader from "@/components/custom/TextLoader";
import { useQuery } from "@tanstack/react-query";
import urlApi from "@/api/url.api";

type UrlPagePageProps = {};

export default function UrlPagePage({}: UrlPagePageProps) {
  const { urlId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getUrl", urlId],
    queryFn: () => urlApi.get(urlId!),
  });

  if (isLoading) {
    return <TextLoader title="Carregando URL..." />;
  }

  if (error) {
    return (
      <UrlError
        title="Erro ao tentar acessar este URL"
        subtitle="URL não encontrada ou você não tem permissão o suficiente para acessá-la"
      />
    );
  }

  if (!urlId || !data) {
    redirect("/");
    return null;
  }

  const { url } = data;

  return (
    <section className="flex flex-col gap-3">
      <UrlTitle />

      <div className="flex flex-col gap-5">
        <UrlInfo url={url} />
        <UrlOtherActions url={url} />
      </div>
    </section>
  );
}
