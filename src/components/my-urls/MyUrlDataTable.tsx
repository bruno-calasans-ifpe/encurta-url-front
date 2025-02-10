import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../custom/data-table/DataColumnHeader";
import DataTable from "../custom/data-table/DataTable";
import { Url } from "@/types/Url.type";
import UrlDropdownMenu from "./UrlDropdownMenu";

type MyUrlDataTableProps = { urls: Url[] };

export default function MyUrlDataTable({ urls }: MyUrlDataTableProps) {
  const userUrlsColumns: ColumnDef<Url>[] = [
    {
      accessorKey: "fullUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL completa" />
      ),
    },
    {
      accessorKey: "shortUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL Curta" />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      cell({ getValue }) {
        return (
          <div className="flex gap-1 justify-center">
            <UrlDropdownMenu urlId={getValue() as number} urls={urls} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="rounded-md border">
      <DataTable data={urls} columns={userUrlsColumns} />
    </div>
  );
}
