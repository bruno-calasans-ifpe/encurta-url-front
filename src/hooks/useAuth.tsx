import authApi from "@/api/auth.api";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import useCustomToast from "./useCustomToast";
import { redirect } from "react-router";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { user, accessToken, login, logout } = useAuthStore();
  const { errorToast } = useCustomToast();

  const checkAuth = async () => {
    setLoading(true);
    try {
      // Pega token do localstorage
      const token = localStorage.getItem("token");
      if (token) {
        // Verifica se oo token é válido
        const { data } = await authApi.checkAuth(token);

        // Salva dados em memória
        login(data.user, token);
      }
    } catch (error) {
      logout();
      errorToast("Logout", "Você foi deslogado");
      redirect("/");
    }
    setChecked(true);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, accessToken, loading, checked, checkAuth };
}
