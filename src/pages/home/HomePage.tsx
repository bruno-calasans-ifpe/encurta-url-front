import ShortUrlForm from "@/components/home/ShortUrlForm";

type HomePageProps = {};

export default function HomePage({}: HomePageProps) {
  return (
    <section className="flex">
      <div className="flex flex-col flex-1 gap-5">
        <h1 className="text-5xl text-center text-indigo-600 font-bold ">
          Encurtador de URL
        </h1>
        <ShortUrlForm />
      </div>
    </section>
  );
}
