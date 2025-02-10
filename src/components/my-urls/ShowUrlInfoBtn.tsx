import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { InfoIcon } from "lucide-react";

type ShowUrlInfoBtnProps = {
  urlId: number;
  icon?: boolean;
  className?: string;
};

export default function ShowUrlInfoBtn({
  urlId,
  icon,
  className,
}: ShowUrlInfoBtnProps) {
  return (
    <a href={`/url/${urlId}`} className="cursor-pointer">
      <Button
        title="Ver Informações"
        size={icon ? "icon" : "sm"}
        className={cn(
          className,
          "bg-transparent text-indigo-500 hover:text-indigo-600 hover:bg-stone-100 p-1 cursor-pointer w-full justify-start",
          icon && "p-3 w-7 h-7"
        )}
      >
        <InfoIcon />
        {!icon && "Ver informações"}
      </Button>
    </a>
  );
}
