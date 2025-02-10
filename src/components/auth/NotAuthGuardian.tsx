import useAuth from "@/hooks/useAuth";
import { Overlay } from "@radix-ui/react-dialog";
import TextLoader from "../custom/TextLoader";
import { Navigate, Outlet } from "react-router";

type NotAuthGuardianProps = {};

export default function NotAuthGuardian({}: NotAuthGuardianProps) {
  const { user, checked, loading } = useAuth();

  if (loading) {
    return (
      <Overlay>
        <TextLoader title="Autenticando..." />;
      </Overlay>
    );
  }

  // Redireciona se estiver autenticado
  if (user && checked) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
