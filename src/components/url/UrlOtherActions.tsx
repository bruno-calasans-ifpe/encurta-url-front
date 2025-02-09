import { Button } from "@/components/ui/Button";
import { Url } from "@/types/Url.type";
import { ChevronLeftIcon, EyeIcon } from "lucide-react";

type UrlOtherActionsProps = {
  url: Url;
};

export default function UrlOtherActions({ url }: UrlOtherActionsProps) {
  return (
    <div className="flex gap-2 justify-end">
      <a href="/">
        <Button size="sm" className="bg-slate-500 hover:bg-slate-600">
          <ChevronLeftIcon />
          Encurtar outra URL
        </Button>
      </a>
      <a href={`/url-access/${url.id}`}>
        <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
          <EyeIcon />
          Ver Acessos
        </Button>
      </a>
    </div>
  );
}
