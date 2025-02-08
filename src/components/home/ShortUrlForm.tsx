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
import Loader from "../custom/Loader";

const createUrlFormSchema = z.object({
  url: z.string().min(1, "URL não pode estar vazia").url("URL inválida"),
});

type ShortUrlFormInput = z.infer<typeof createUrlFormSchema>;

type ShortUrlFormProps = {};

export default function ShortUrlForm({}: ShortUrlFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ShortUrlFormInput>({
    resolver: zodResolver(createUrlFormSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: ShortUrlFormInput) {
    // Short url
    setLoading(true);
    console.log(values);
    setLoading(false);
  }

  // Verifica se o campo não está vazio e é válido
  const isFormValid = form.formState.isValid;
  const isFormEmpty = form.getValues("url").length === 0;

  return (
    <Form {...form}>
      <form
        id="short-url-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="url"
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
