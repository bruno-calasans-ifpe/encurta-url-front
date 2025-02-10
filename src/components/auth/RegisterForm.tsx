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
  FormDescription,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "../ui/Button";
import { LogInIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import authApi from "@/api/auth.api";
import useCustomToast from "@/hooks/useCustomToast";
import { AxiosError } from "axios";
import useAuthStore from "@/store/authStore";
import { redirect, useNavigate } from "react-router";

const registerFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "Email não pode estar vazio")
    .email("Email inválido"),
  password: z.string().min(6, "Senha deve ter 6 ou mais caracteres"),
});

type RegisterFormInput = z.infer<typeof registerFormSchema>;

type RegisterFormProps = {};

export default function RegisterForm({}: RegisterFormProps) {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const { successToast, errorToast } = useCustomToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const registerUserHandler = async (inputs: RegisterFormInput) => {
    setLoading(true);
    try {

      // Cadastra usuário
      const { user } = await authApi.register(inputs);

      // Faz login automaticamente
      const { accessToken } = await authApi.login({
        email: inputs.email,
        password: inputs.password,
      });

      // Salva dados de login em memória
      authStore.login(user, accessToken);
      localStorage.setItem("token", accessToken);

      // Reseta formulário
      form.reset();

      // Vai para página inicial
      navigate("/");

      successToast("Sucesso: Cadastro", "Cadastro realizado com sucesso");
      
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409)
          errorToast("Error: Cadastro", "Email já está em uso.");
      } else {
        errorToast(
          "Error: Desconhecido",
          "Algo deu errado. Tente novamente mais tarde."
        );
      }
    }
    setLoading(false);
  };

  const { invalid: isNameInvalid, isTouched: isNameFieldTouched } =
    form.getFieldState("name");

  const { invalid: isEmailFieldInvalid, isTouched: isEmailFieldTouched } =
    form.getFieldState("email");

  const { invalid: isPasswordFieldInvalid, isTouched: isPasswordFieldTouched } =
    form.getFieldState("password");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>
          Crie sua conta para poder salvar suas URL's encurtadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="short-url-form"
            onSubmit={form.handleSubmit(registerUserHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Seu nome"
                      className={cn(
                        "focus-visible:ring-transparent",
                        isNameInvalid && isNameFieldTouched && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormDescription>
                    Sua senha deve ter 6 ou mais caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form buttons */}
            <div className="flex justify-between">
              {/*  */}
              <Button
                disabled={loading}
                type="submit"
                className=" bg-emerald-600 hover:bg-emerald-700 transition-all font-bold"
              >
                <LogInIcon />
                {loading ? "Carregando..." : "Registrar"}
              </Button>

              <a href="/auth/login">
                <Button
                  type="button"
                  variant="link"
                  className="hover:text-indigo-600 transition-all"
                >
                  <p>Já tenho conta</p>
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
