import { EyeIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

type ShowUrlAccessesBtnProps = {
  urlId: number;
  className?: string;
  icon?: boolean;
};

export default function ShowUrlAccessesBtn({
  urlId,
  className,
  icon,
}: ShowUrlAccessesBtnProps) {
  return (
    <a href={`/url-access/${urlId}`} className="cursor-pointer">
      <Button
        title="Ver Acessos"
        size={icon ? "icon" : "sm"}
        className={cn(
          "bg-transparent text-amber-500 hover:text-amber-600 hover:bg-stone-100 p-1 cursor-pointer w-full justify-start transition-all",
          icon && "p-3 w-7 h-7",
          className
        )}
      >
        <EyeIcon />
        {!icon && "Ver acessos"}
      </Button>
    </a>
  );
}
