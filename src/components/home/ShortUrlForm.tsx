import { Button } from "@/components/ui/Button";
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
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router";
import urlApi from "@/api/url.api";
import useAuthStore from "@/store/authStore";
import useCustomToast from "@/hooks/useCustomToast";

const createUrlFormSchema = z.object({
  fullUrl: z.string().min(1, "URL não pode estar vazia").url("URL inválida"),
});

type ShortUrlFormInput = z.infer<typeof createUrlFormSchema>;

type ShortUrlFormProps = {};

export default function ShortUrlForm({}: ShortUrlFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { successToast, errorToast, infoToast } = useCustomToast();

  const form = useForm<ShortUrlFormInput>({
    resolver: zodResolver(createUrlFormSchema),
    defaultValues: {
      fullUrl: "",
    },
  });

  const createUrlHandler = async (inputs: ShortUrlFormInput) => {
    if (!user) {
      infoToast(
        "Info: Usuário não logado",
        "Você precisa criar uma conta para poder encurtar uma URL"
      );
      return navigate("/auth/login");
    }

    // Short url
    setLoading(true);
    try {
      const { url } = await urlApi.create({
        ...inputs,
        user_id: user.id,
        redirectUrl: location.href,
      });
      successToast("Criar URL", "URL criada com sucesso");
      navigate(`/url/${url.id}`);
    } catch (error) {
      errorToast("Error: criar URL", "Não foi possível criar sua URL");
    }

    setLoading(false);
  };

  // Verifica se o campo não está vazio e é válido
  const isFormValid = form.formState.isValid;
  const isFormEmpty = form.getValues("fullUrl").length === 0;

  return (
    <Form {...form}>
      <form
        id="short-url-form"
        onSubmit={form.handleSubmit(createUrlHandler)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="fullUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cole sua URL aqui"
                  className={cn(
                    "h-16 focus-visible:ring-transparent",
                    isFormValid && !isFormEmpty && "border-emerald-500",
                    !isFormValid && !isFormEmpty && "border-red-500"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all font-bold h-12 text-lg"
        >
          {loading ? "Carregando..." : "Encurtar URL"}
        </Button>
      </form>
    </Form>
  );
}
