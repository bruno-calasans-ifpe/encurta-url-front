import { redirect, useParams } from "react-router";
import UrlInfo from "@/components/url/UrlInfo";
import UrlOtherActions from "../../components/url/UrlOtherActions";
import UrlTitle from "@/components/url/UrlTitle";
import Loader from "@/components/custom/Loader";
import useUrl from "@/hooks/useUrl";
import UrlError from "@/components/custom/UrlError";
import TextLoader from "@/components/custom/TextLoader";

type UrlPagePageProps = {};

export default function UrlPagePage({}: UrlPagePageProps) {
  const { urlId } = useParams();
  const { url, loading, error } = useUrl({ urlId: +urlId! });

  if (loading) {
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

  if (!urlId || !url) {
    redirect("/");
    return null;
  }

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
