import {
  Table as LibTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  loading?: boolean;
}

interface ColumnDefinition<T> {
  cell: (props: { row: T; index: number }) => React.ReactNode;
  name: string;
  className?: string;
}

export default function Table<T>({ columns, data }: Props<T>) {
  return (
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
  );
}
