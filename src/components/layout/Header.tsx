import CreateShortUrlBtn from "@/components/header/CreateUrlBtn";
import LoginBtn from "@/components/header/LoginBtn";
import RegisterBtn from "../header/RegisterBtn";

export default function Header() {
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
        <LoginBtn />
        <RegisterBtn />
      </div>
    </header>
  );
}
