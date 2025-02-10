import authApi from "@/api/auth.api";
import useAuthStore from "@/store/authStore";
import useCustomToast from "./useCustomToast";
import { redirect } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const { user, accessToken, login, logout } = useAuthStore();
  const { errorToast } = useCustomToast();

  const checkAuth = async () => {
    try {
      // Pega token do localstorage
      const token = localStorage.getItem("token");
      if (token) {

        // Verifica se o token é válido
        const { data } = await authApi.checkAuth(token);

        // Salva dados em memória
        login(data.user, token);
      }
      return true;
    } catch (error) {
      logout();
      redirect("/");
      errorToast("Logout", "Você foi deslogado automaticamente");
      return false;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
    initialData: false,
  });

  return {
    user,
    accessToken,
    loading: isLoading,
    checked: data,
    error,
    checkAuth,
  };
}
