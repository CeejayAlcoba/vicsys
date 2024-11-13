import { useState, useEffect } from "react";
import { Table, Input, Select, Space, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { TableProps } from "antd";

interface ColumnConfig {
  title: string;
  dataIndex: string;
  width?: number | string;
  fixed?: boolean | "left" | "right";
  render?: (value: any, record: any) => React.ReactNode;
}

interface DataTableProps<T extends object>
  extends Omit<TableProps<T>, "columns"> {
  dataSource?: T[];
  columns?: ColumnConfig[];
  showReset?: boolean;
  searchPlaceholder?: string;
}

export default function DataTable<T extends object>({
  dataSource = [],
  columns = [],
  showReset = true,
  searchPlaceholder = "Search",
  ...restProps
}: DataTableProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState<string>();
  const [filteredData, setFilteredData] = useState<T[]>([]);

  // Update filtered data when dataSource changes
  useEffect(() => {
    setFilteredData(dataSource);
  }, [dataSource]);

  // Enhance columns with sorting capability
  const enhancedColumns: ColumnsType<T> = columns.map((column) => ({
    ...column,
    sorter: (a: any, b: any) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return aValue - bValue;
      }
      return 0;
    },
    sortDirections: ["ascend", "descend"],
    onCell: () => ({
      style: {
        padding: "4px 8px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    }),
  }));

  const columnOptions = columns.map((column) => ({
    label: column.title,
    value: column.dataIndex,
  }));

  const handleSearch = (value: string, column?: string) => {
    setSearchText(value);

    if (!column || !value) {
      setFilteredData(dataSource);
      return;
    }

    const filtered = dataSource.filter((record: any) => {
      const cellValue = record[column];
      if (cellValue == null) return false;
      return String(cellValue).toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const handleColumnSelect = (value: string) => {
    setSearchColumn(value);
    handleSearch(searchText, value);
  };

  const handleReset = () => {
    setSearchText("");
    setSearchColumn(undefined);
    setFilteredData(dataSource);
  };

  return (
    <div>
      <Space style={{ marginBottom: 8 }}>
        <Select
          style={{ width: 200 }}
          placeholder="Select column"
          allowClear
          options={columnOptions}
          onChange={handleColumnSelect}
          value={searchColumn}
          size="small"
        />
        <Input
          placeholder={searchPlaceholder}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value, searchColumn)}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          disabled={!searchColumn}
          size="small"
        />
        {showReset && (
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            disabled={!searchText && !searchColumn}
            size="small"
          >
            Reset
          </Button>
        )}
      </Space>

      <Table
        {...restProps}
        columns={enhancedColumns}
        dataSource={filteredData}
        size="small"
        pagination={{
          total: filteredData.length,
          pageSize: 5,
          showSizeChanger: false,
          size: "small",
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          ...restProps.pagination,
        }}
      />
    </div>
  );
}
