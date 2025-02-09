import CreateShortUrlBtn from "@/components/header/CreateUrlBtn";
import LoginBtn from "@/components/header/LoginBtn";
import RegisterBtn from "../header/RegisterBtn";
import useAuthStore from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header
      id="header"
      className="h-20 bg-stone-800 flex items-center justify-between just p-3"
    >
      {/* Logo */}
      <div id="header-logo">
        <img src="/imgs/logo-2.png" className="h-14 w-14" />
      </div>

      {/* Buttons */}
      <div id="header-buttons" className="flex gap-2">
        <CreateShortUrlBtn />

        {/* Usuário deslogado */}
        {!user && (
          <>
            <LoginBtn />
            <RegisterBtn />
          </>
        )}

        {/* Usuário logado */}
        {user && (
          <>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </header>
  );
}
