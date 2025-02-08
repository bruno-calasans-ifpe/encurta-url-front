import { Button } from "@/components/ui/Button";
import { UserIcon } from "lucide-react";

type RegisterBtnProps = {};

export default function RegisterBtn({}: RegisterBtnProps) {
  return (
    <a id="register-btn" href="/auth/register">
      <Button
        size="sm"
        variant="outline"
        className="bg-slate-500 hover:bg-slate-600 text-white hover:text-white border-none h-8  transition-all"
      >
        <UserIcon />
        Registrar
      </Button>
    </a>
  );
}
