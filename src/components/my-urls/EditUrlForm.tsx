import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import { useState } from "react";
import useUrlStore from "@/store/urlStore";
import urlApi from "@/api/url.api";
import useAuthStore from "@/store/authStore";
import useCustomToast from "@/hooks/useCustomToast";
import { useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "../ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const editUrlFormSchema = z.object({
  fullUrl: z.string().min(1, "URL não pode estar vazia").url("URL inválida"),
  regenerateNewShortUrl: z.boolean().default(false).optional(),
});

type EditUrlInputs = z.infer<typeof editUrlFormSchema>;

export default function EditUrlForm() {
  const { user } = useAuthStore();
  const { url } = useUrlStore();
  const { successToast, errorToast } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const form = useForm<EditUrlInputs>({
    resolver: zodResolver(editUrlFormSchema),
    defaultValues: {
      fullUrl: url?.fullUrl,
      regenerateNewShortUrl: false,
    },
  });

  const editUrlHandler = async ({
    regenerateNewShortUrl,
    fullUrl,
  }: EditUrlInputs) => {
    if (!user || !url) return;
    setLoading(true);
    try {
      if (regenerateNewShortUrl) {
        console.log("Regenerando nova URL Curta....");
        await urlApi.editUrl(url.id, {
          redirectUrl: location.origin,
          fullUrl,
        });
      } else {
        console.log("Regenerando atualizando URL....");
        await urlApi.editUrl(url.id, { fullUrl });
      }

      await client.refetchQueries({
        queryKey: ["getUserUrls"],
      });
      successToast("Edição: URL", "URL editada com sucesso");
    } catch (error) {
      errorToast("Edição Falhou", "Não foi possível editar sua URL");
    }
    setLoading(false);
  };

  console.log(import.meta.env.VITE_BASE_API_URL);

  return (
    <Form {...form}>
      <form
        id="short-url-form"
        onSubmit={form.handleSubmit(editUrlHandler)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="fullUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="search"
                  {...field}
                  placeholder="Cole sua URL aqui"
                  className={cn("h-16 focus-visible:ring-transparent")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regenerateNewShortUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex items-center gap-1">
                <FormLabel className="m-0">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  Regenerar outra URL curta
                </FormLabel>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-1 justify-end">
          <DialogClose asChild>
            <Button
              disabled={loading}
              type="button"
              className="bg-red-600 hover:bg-red-700 transition-all font-bold"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 transition-all font-bold"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
