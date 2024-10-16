import { ColumnsType } from "antd/es/table/interface";
import { Table, TableProps } from "antd";

interface DataTableProps<T> extends TableProps<T> {
  dataSource?: readonly T[] | undefined;
  columns?: ColumnsType<T> | undefined;
}

export default function DataTable<T extends object>(props: DataTableProps<T>) {
  return <Table {...props} scroll={{ x: 400 }} size="small" />;
}
