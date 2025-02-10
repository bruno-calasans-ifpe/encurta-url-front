import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/Button";

type GoToUrlBtnProps = {};

export default function GoToUrlBtn({}: GoToUrlBtnProps) {
  return (
    <a href="/">
      <Button size="sm" className="bg-slate-500 hover:bg-slate-600">
        <ChevronLeftIcon />
        Encurtar outra URL
      </Button>
    </a>
  );
}
