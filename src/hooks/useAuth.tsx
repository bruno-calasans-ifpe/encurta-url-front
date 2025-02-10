import authApi from "@/api/auth.api";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import useCustomToast from "./useCustomToast";
import { redirect } from "react-router";

export default function useAuth() {
  const { user, accessToken, login, logout } = useAuthStore();
  const { errorToast } = useCustomToast();

  const checkAuth = async () => {
    try {
      // Pega token do localstorage
      const token = localStorage.getItem("token");
      if (!token) return;

      // Verifica se oo token é válido
      const { data } = await authApi.checkAuth(token);

      // Salva dados em memória
      login(data.user, token);
    } catch (error) {
      logout();
      errorToast("Logout", "Você foi deslogado");
      redirect("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, accessToken, checkAuth };
}
