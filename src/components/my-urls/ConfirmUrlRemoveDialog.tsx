import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import urlApi from "@/api/url.api";
import useCustomToast from "@/hooks/useCustomToast";
import useUrlStore from "@/store/urlStore";
import { TrashIcon } from "lucide-react";

export default function ConfirmUrlRemoveDialog() {
  const { url } = useUrlStore();
  const { successToast, errorToast } = useCustomToast();
  const client = useQueryClient();

  const removeUrlHandler = async () => {
    try {
      if (!url) return null;
      await urlApi.removeUrl(url.id);
      await client.refetchQueries({ queryKey: ["getUserUrls"] });
      successToast("Sucesso: Remover URL", "URL removida com sucesso");
    } catch (error) {
      errorToast("Error: remover URL", "Não foi possível remover esta URL");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex justify-start gap-1 p-1 w-full text-red-500 hover:text-red-600"
          variant="ghost"
        >
          <TrashIcon />
          Remover
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja excluir esta url?</DialogTitle>
          <DialogDescription>
            Esta ação é permanente e não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              size="sm"
              onClick={removeUrlHandler}
              className="bg-red-500 hover:bg-red-600"
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
