import { Url } from "@/types/Url.type";
import { Button } from "../ui/Button";
import { ChevronLeftIcon } from "lucide-react";

type UrlAccessTitleProps = {
  url: Url;
};

export default function UrlAccessTitle({ url }: UrlAccessTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-4xl font-bold">Acessos da URL</p>
        <p className="text-stone-600 italic">
          Veja os acessos da URL:{" "}
          <a href="" className="text-indigo-600 hover:underline">
            {url.shortUrl}
          </a>
        </p>
      </div>
      <a href={`/url/${url.id}`}>
        <Button size="sm" className="bg-slate-500 hover:bg-slate-600">
          <ChevronLeftIcon />
          Ver URL
        </Button>
      </a>
    </div>
  );
}
