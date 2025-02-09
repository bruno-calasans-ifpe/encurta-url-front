import CreateShortUrlBtn from "@/components/header/CreateUrlBtn";
import LoginBtn from "@/components/header/LoginBtn";
import RegisterBtn from "../header/RegisterBtn";
import useAuthStore from "@/store/authStore";
import UserMenu from "../header/UserMenu";

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
      <div id="header-buttons" className="flex gap-1 items-center">
        <CreateShortUrlBtn />

        {/* Usuário deslogado */}
        {!user && (
          <>
            <LoginBtn />
            <RegisterBtn />
          </>
        )}

        {/* Usuário logado */}
        <UserMenu />
      </div>
    </header>
  );
}
