import { redirect, useParams } from "react-router";
import UrlAccessTitle from "@/components/url-access/UrlAccessTitle";
import UrlAccessTable from "@/components/url-access/UrlAccessTable";
import useUrl from "@/hooks/useUrl";
import TextLoader from "@/components/custom/TextLoader";
import UrlError from "@/components/custom/UrlError";

type UrlAccessPageProps = {};

export default function UrlAccessPage({}: UrlAccessPageProps) {
  const { urlId } = useParams();
  const { url, loading, error } = useUrl({ urlId: +urlId! });

  if (loading) return <TextLoader title="Carregando dados..." />;

  if (error) {
    return (
      <UrlError
        title="Erro ao carregar histórico de acessos da URL"
        subtitle="URL não encontrada ou você não tem permissão o suficiente para acessar seu histórico."
      />
    );
  }

  if (!urlId || !url) {
    redirect("/");
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <UrlAccessTitle url={url} />
      <UrlAccessTable accesses={url.accesses} />
    </section>
  );
}
