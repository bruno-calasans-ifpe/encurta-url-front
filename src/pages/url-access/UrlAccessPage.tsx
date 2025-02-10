import { Navigate, useParams } from "react-router";
import UrlAccessTitle from "@/components/url-access/UrlAccessTitle";
import UrlAccessTable from "@/components/url-access/UrlAccessTable";
import TextLoader from "@/components/custom/TextLoader";
import UrlError from "@/components/custom/UrlError";
import { useQuery } from "@tanstack/react-query";
import urlApi from "@/api/url.api";
import useAuth from "@/hooks/useAuth";

export default function UrlAccessPage() {
  const { user } = useAuth();
  const { urlId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getUrl", urlId],
    queryFn: () => urlApi.get(urlId!),
  });

  if (isLoading) return <TextLoader title="Carregando dados..." />;

  if (error) {
    return (
      <UrlError
        title="Erro ao carregar histórico de acessos da URL"
        subtitle="URL não encontrada ou você não tem permissão o suficiente para acessar seu histórico."
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
    <section className="flex flex-col gap-4">
      <UrlAccessTitle url={data.url} />
      <UrlAccessTable accesses={data.url.accesses} />
    </section>
  );
}
