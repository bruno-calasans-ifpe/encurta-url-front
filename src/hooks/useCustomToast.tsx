import { useToast } from "./use-toast";

export default function useCustomToast() {
  const { toast } = useToast();

  const infoToast = (title: string, desc: string) => {
    toast({
      title: (<p className="font-bold">{title}</p>) as any,
      description: desc,
      className: "bg-indigo-600 text-white",
    });
  };

  const errorToast = (title: string, desc: string) => {
    toast({
      title: (<p className="font-bold">{title}</p>) as any,
      description: desc,
      className: "bg-red-600 text-white",
    });
  };

  const successToast = (title: string, desc: string) => {
    toast({
      title: (<p className="font-bold">{title}</p>) as any,
      description: desc,
      className: "bg-emerald-600 text-white",
    });
  };

  return { infoToast, errorToast, successToast };
}
