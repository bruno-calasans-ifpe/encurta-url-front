import useAuth from "@/hooks/useAuth";
import TextLoader from "../custom/TextLoader";
import Overlay from "../custom/Overlay";
import { Navigate, Outlet } from "react-router";

export default function AuthGuardian() {
  const { user, checked, loading } = useAuth();

  if (loading) {
    return (
      <Overlay>
        <TextLoader title="Autenticando..." />;
      </Overlay>
    );
  }

  if (!user && checked) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
