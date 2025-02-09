import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "../ui/Button";
import { LogInIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import authApi from "@/api/auth.api";
import { AxiosError } from "axios";
import useCustomToast from "@/hooks/useCustomToast";
import { ApiError } from "@/api/ApiError";
import useAuthStore from "@/store/authStore";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email não pode estar vazio")
    .email("Email inválido"),
  password: z.string().min(1, "Senha não pode estar vazia"),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

type LoginFormProps = {};

export default function LoginForm({}: LoginFormProps) {
  const { login } = useAuthStore();
  const { successToast, errorToast } = useCustomToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = async (inputs: LoginFormInput) => {
    setLoading(true);
    try {
      
      const { accessToken, user } = await authApi.login(inputs);
      login(user, accessToken);
      localStorage.setItem("token", accessToken);
      successToast("Sucesso: Login", "Login realizado com sucesso");

    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403)
          errorToast(
            "Error: Login",
            "Verifique suas credenciais e tente novamente"
          );
      } else {
        errorToast(
          "Error: Desconhecido",
          "Algo deu errado. Tente novamente mais tarde."
        );
      }
    }
    setLoading(false);
  };

  const { invalid: isEmailFieldInvalid, isTouched: isEmailFieldTouched } =
    form.getFieldState("email");

  const { invalid: isPasswordFieldInvalid, isTouched: isPasswordFieldTouched } =
    form.getFieldState("password");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer login com sua conta</CardTitle>
        <CardDescription>
          Acesse sua conta informando para poder ver suas URL's criadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="short-url-form"
            onSubmit={form.handleSubmit(loginHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Seu email"
                      className={cn(
                        "focus-visible:ring-transparent",
                        isEmailFieldInvalid &&
                          isEmailFieldTouched &&
                          "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo de senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Sua senha"
                      type="password"
                      autoComplete="on"
                      className={cn(
                        "focus-visible:ring-transparent",
                        isPasswordFieldInvalid &&
                          isPasswordFieldTouched &&
                          "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form buttons */}
            <div className="flex justify-between">
              <Button
                disabled={loading}
                type="submit"
                className=" bg-indigo-600 hover:bg-indigo-700 transition-all font-bold"
              >
                <LogInIcon />
                {loading ? "Carregando..." : "Entrar"}
              </Button>
              <a href="/auth/register">
                <Button
                  type="button"
                  variant="link"
                  className="hover:text-indigo-600 transition-all"
                >
                  <p>Não tenho conta</p>
                </Button>
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
