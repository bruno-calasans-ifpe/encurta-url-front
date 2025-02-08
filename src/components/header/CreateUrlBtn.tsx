import { Button } from "@/components/ui/Button";
import { LinkIcon } from "lucide-react";

type CreateShortUrlBtnProps = {};

export default function CreateShortUrlBtn({}: CreateShortUrlBtnProps) {
  return (
    <a id="create-short-url-btn" href="/">
      <Button
        size="sm"
        variant="outline"
        className="bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white border-none h-8  transition-all"
      >
        <LinkIcon />
        Encurtar
      </Button>
    </a>
  );
}
