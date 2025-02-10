import { EllipsisVerticalIcon, EyeIcon, InfoIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmUrlRemoveDialog from "./ConfirmUrlRemoveDialog";
import EditUrlDialog from "./EditUrlDialog";
import ShowUrlInfoBtn from "./ShowUrlInfoBtn";
import ShowUrlAccessesBtn from "../url/ShowUrlAccessesBtn";
import { Url } from "@/types/Url.type";
import useUrlStore from "@/store/urlStore";

type UrlDropdownMenuProps = {
  urlId: number;
  urls: Url[];
};

export default function UrlDropdownMenu({ urls, urlId }: UrlDropdownMenuProps) {
  const { setUrl } = useUrlStore();

  const selectUrl = (open: boolean) => {
    if (open) {
      const foundUrl = urls.find((url) => url.id === urlId);
      setUrl(foundUrl as any);
      return;
    }
    setUrl(null);
  };

  return (
    <DropdownMenu onOpenChange={selectUrl}>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col gap-1 p-2">
        {/* Edit URL */}
        <DropdownMenuItem asChild className="p-0">
          <EditUrlDialog urlId={urlId} />
        </DropdownMenuItem>

        {/* Botão para ver detalhes da URL */}
        <DropdownMenuItem asChild className="p-0">
          <ShowUrlInfoBtn urlId={urlId} />
        </DropdownMenuItem>

        {/* Botão para ver acessos da URL */}
        <DropdownMenuItem asChild className="p-0">
          <ShowUrlAccessesBtn urlId={urlId} />
        </DropdownMenuItem>

        {/* Remove URL dropdown */}
        <DropdownMenuItem asChild>
          <ConfirmUrlRemoveDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
