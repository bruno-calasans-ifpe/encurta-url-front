import { Button } from "@/components/ui/Button";
import { LogInIcon } from "lucide-react";

type LoginBtnProps = {};

export default function LoginBtn({}: LoginBtnProps) {
  return (
    <a id="login-btn" href="/">
      <Button
        size="sm"
        variant="outline"
        className="border-none h-8  transition-all"
      >
        <LogInIcon />
        Entrar
      </Button>
    </a>
  );
}
