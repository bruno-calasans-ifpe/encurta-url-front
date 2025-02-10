import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { TrashIcon } from "lucide-react";

type RemoveUrlBtnProps = {
  urlId: number;
  className?: string;
  icon?: boolean;
};

export default function RemoveUrlBtn({
  urlId,
  icon,
  className,
}: RemoveUrlBtnProps) {
  return (
    <Button
      title="Remover"
      size={icon ? "icon" : "sm"}
      className={cn(
        "bg-red-500 hover:bg-red-600",
        icon && "p-3 w-7 h-7",
        className
      )}
    >
      <TrashIcon size={12} />
      {!icon && "Remover URL"}
    </Button>
  );
}
