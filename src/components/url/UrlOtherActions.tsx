import type { Url } from "@/types/Url.type";
import ShowAccessesBtn from "./ShowUrlAccessesBtn";
import GoToUrlBtn from "./GoToUrlBtn";

type UrlOtherActionsProps = {
  url: Url;
};

export default function UrlOtherActions({ url }: UrlOtherActionsProps) {
  return (
    <div className="flex gap-2 justify-end">
      <GoToUrlBtn />
      <ShowAccessesBtn
        urlId={url.id}
        className="bg-amber-500 hover:bg-amber-600 text-white hover:text-white p-2"
      />
    </div>
  );
}
