import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Url } from "@/types/Url.type";

type UrlInfoProps = {
  url: Url;
};

export default function UrlInfo({ url }: UrlInfoProps) {
  const [copied, setCopied] = useState(false);

  const copyShortUrl = () => {
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);

    let timeId = setTimeout(() => {
      setCopied(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="short-url-input" className="capitalize text-lg">
          Url curta
        </Label>
        <div className="flex gap-1">
          {/* Mostra a url curta */}
          <Input
            id="short-url-input"
            readOnly
            value={url.shortUrl}
            className="focus-visible:ring-transparent focus:border-indigo-500 italic"
          />
          {/* Botão para copiar url */}
          <Button
            id="copy-short-url"
            onClick={copyShortUrl}
            className={cn(
              "bg-indigo-500 hover:bg-indigo-600 transition-all",
              copied && "bg-emerald-500 hover:bg-emerald-600"
            )}
          >
            {copied ? (
              <>
                <CopyCheckIcon />
                Url Copiada
              </>
            ) : (
              <>
                <CopyIcon />
                Copiar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Url Completa */}
      <div>
        <p className="capitalize text-lg font-semibold">Url Completa</p>
        <a
          href=""
          className="text-indigo-600 italic  hover:underline transition"
        >
          {url.fullUrl}
        </a>
      </div>
    </div>
  );
}
