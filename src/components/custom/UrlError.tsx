import { Button } from "../ui/Button";

type UrlErrorProps = {
  title: string;
  subtitle: string;
};

export default function UrlError({ title, subtitle }: UrlErrorProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center flex-1">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-lg">{subtitle}</p>
      </div>
      <a href="/">
        <Button size="sm">Voltar para página inicial</Button>
      </a>
    </div>
  );
}
