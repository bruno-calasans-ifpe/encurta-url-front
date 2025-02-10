type MyUrlTitleProps = {};

export default function MyUrlTitle({}: MyUrlTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-4xl font-bold">URLs criadas</p>
        <p className="text-stone-600 italic">
          Veja suas URLs criadas.
          <a href="" className="text-indigo-600 hover:underline">
            {/* {url.shortUrl} */}
          </a>
        </p>
      </div>
      {/* <a href={`/url/${url.id}`}>
        <Button size="sm" className="bg-slate-500 hover:bg-slate-600">
          <ChevronLeftIcon />
          Ver URL
        </Button>
      </a> */}
    </div>
  );
}
