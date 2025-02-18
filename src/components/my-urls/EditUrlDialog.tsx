import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { Button } from "../ui/Button";
import EditUrlForm from "./EditUrlForm";

export default function EditUrlDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex justify-start gap-1 p-1 w-full text-emerald-500 hover:text-emerald-600"
          variant="ghost"
        >
          <EditIcon />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar URL</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Ao salvar as mudanças, apenas a URL completa será modificada. Marque o
          checkbox abaixo para regenerar outra URL curta.
        </DialogDescription>
        <EditUrlForm />
      </DialogContent>
    </Dialog>
  );
}
