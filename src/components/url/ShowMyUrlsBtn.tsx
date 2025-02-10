import { Button } from "../ui/Button";
import { LinkIcon } from "lucide-react";

export default function ShowMyUrlsBtn() {
  return (
    <a href="/my-urls">
      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
        <LinkIcon />
        Ver minhas URLs
      </Button>
    </a>
  );
}
''