import Loader from "./Loader";

type ActionLoaderProps = {
  title: string;
};

export default function TextLoader({ title }: ActionLoaderProps) {
  return (
    <div className="flex gap-1 justify-center items-center flex-1">
      <Loader className="bg-indigo-500" />
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
}
