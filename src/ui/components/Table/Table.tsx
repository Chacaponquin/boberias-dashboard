import {
  Table as LibTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "../Input/Input";

interface Props<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  loading?: boolean;
  search?: { value: string; onChange: (v: string) => void };
}

interface ColumnDefinition<T> {
  cell: (props: { row: T; index: number }) => React.ReactNode;
  name: string;
  className?: string;
}

export default function Table<T>({ columns, data, search }: Props<T>) {
  return (
    <>
      {search && (
        <div className="flex w-full mb-3 gap-x-5 justify-between">
          <div className="w-full max-w-[260px]">
            {search && (
              <Input
                value={{ onChange: search.onChange, value: search.value }}
                placeholder="Buscar..."
              />
            )}
          </div>

          <div className="flex items-center"></div>
        </div>
      )}

      <LibTable>
        <TableHeader>
          <TableRow>
            {columns.map((c, index) => (
              <TableHead key={index}>{c.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((c, j) => (
                <TableCell key={j} className={c.className}>
                  {c.cell({ index: index, row: item })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </LibTable>
    </>
  );
}
