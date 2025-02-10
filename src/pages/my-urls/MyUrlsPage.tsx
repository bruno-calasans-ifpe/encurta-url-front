import urlApi from "@/api/url.api";
import TextLoader from "@/components/custom/TextLoader";
import UrlError from "@/components/custom/UrlError";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router";
import useAuthStore from "@/store/authStore";
import MyUrlTitle from "@/components/my-urls/MyUrlTitle";
import MyUrlDataTable from "@/components/my-urls/MyUrlDataTable";

export default function MyUrlspage() {
  const { user } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserUrls", user?.id],
    queryFn: () => urlApi.getUserUrls(user?.id!),
    enabled: !!user,
  });

  if (isLoading) return <TextLoader title="Carregando URLS..." />;

  if (error) {
    return (
      <UrlError
        title="Erro ao carregar URLs do usuário"
        subtitle="URL não encontrada ou você não tem permissão o suficiente para ver as URLs."
      />
    );
  }

  if (!user || !data) {
    redirect("/");
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <MyUrlTitle />
      <MyUrlDataTable urls={data.urls} />
    </section>
  );
}
