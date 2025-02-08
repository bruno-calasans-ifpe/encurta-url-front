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
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormInput) {
    setLoading(true);
    console.log(values);
    setLoading(false);
  }

  const { invalid: isEmailFieldInvalid, isTouched: isEmailFieldTouched } =
    form.getFieldState("email");

  const { invalid: isPasswordFieldInvalid, isTouched: isPasswordFieldTouched } =
    form.getFieldState("password");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer login com sua conta</CardTitle>
        <CardDescription>
          Acesse sua conta informando email e senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="short-url-form"
            onSubmit={form.handleSubmit(onSubmit)}
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
                        // !isEmailFieldInvalid &&
                        //   isEmailFieldTouched &&
                        //   "border-emerald-500",
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
                        // !isPasswordFieldInvalid &&
                        //   isPasswordFieldTouched &&
                        //   "border-emerald-500",
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
