import { UrlAccess } from "@/types/UrlAccess.type";
import { DataTableColumnHeader } from "../custom/data-table/DataColumnHeader";
import DataTable from "../custom/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";

const urlAccessesColumn: ColumnDef<UrlAccess>[] = [
  {
    accessorKey: "accessDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Acesso" />
    ),
  },
  {
    accessorKey: "ip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP" />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Localização" />
    ),
  },
];

type UrlAccessTableProps = {
  accesses: UrlAccess[];
};

export default function UrlAccessTable({ accesses }: UrlAccessTableProps) {
  return (
    <div className="rounded-md border">
      <DataTable data={accesses} columns={urlAccessesColumn} />
    </div>
  );
}
