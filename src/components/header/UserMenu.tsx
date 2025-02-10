import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, DoorOpenIcon } from "lucide-react";
import useAuthStore from "@/store/authStore";
import useCustomToast from "@/hooks/useCustomToast";
import { useNavigate } from "react-router";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { successToast } = useCustomToast();

  const logoutHandler = () => {
    logout();
    successToast("Logout", "Deslogado com sucesso");
    navigate("/");
  };

  if (!user) return null;

  return (
    <Menubar className="bg-transparent border-0">
      <MenubarMenu>
        <MenubarTrigger className="bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white focus:bg-transparent">
          <div className="flex gap-1 items-center">
            {/* <p className="text-white font-bold">{user.name}</p> */}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </MenubarTrigger>
        <MenubarContent side="bottom" align="end">
          <MenubarItem className="flex items-center gap-1" disabled>
            <p className="font-bold">{user.name}</p>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex items-center gap-1">
            <LinkIcon size={16} />
            <a href="/my-urls" className="w-full">
              Minhas URLS
            </a>
          </MenubarItem>
          <MenubarItem
            onClick={logoutHandler}
            className="flex items-center gap-1"
          >
            <DoorOpenIcon size={16} />
            Deslogar
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
