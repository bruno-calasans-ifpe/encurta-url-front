import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
};

export default function Loader({ className }: LoaderProps) {
  return (
    <div className="rounded-full justify-center items-center">
      <div
        className={cn(
          "animate-pulse h-4 w-4 bg-red-500 rounded-full",
          className
        )}
      ></div>
    </div>
  );
}
