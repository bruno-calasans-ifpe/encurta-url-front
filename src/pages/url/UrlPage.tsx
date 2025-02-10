import { Navigate, useParams } from "react-router";
import UrlInfo from "@/components/url/UrlInfo";
import UrlOtherActions from "../../components/url/UrlOtherActions";
import UrlTitle from "@/components/url/UrlTitle";
import UrlError from "@/components/custom/UrlError";
import TextLoader from "@/components/custom/TextLoader";
import { useQuery } from "@tanstack/react-query";
import urlApi from "@/api/url.api";
import useAuth from "@/hooks/useAuth";

export default function UrlPagePage() {
  const { user } = useAuth();
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
    return <Navigate to="/" />;
  }

  // Só o usuário dono daquela URL pode acessar
  if (data.url && user && user.id !== data.url?.user?.id) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex flex-col gap-3">
      <UrlTitle />

      <div className="flex flex-col gap-5">
        <UrlInfo url={data.url} />
        <UrlOtherActions url={data.url} />
      </div>
    </section>
  );
}
