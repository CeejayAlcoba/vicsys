import { Pie } from "@ant-design/charts";
import { useEffect, useState } from "react";

type DataType = {
  type: string;
  value: number;
};

export default function TotalUsersPieChart() {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setData([
        { type: "Admin", value: 27 },
        { type: "Volunteers", value: 25 },
        { type: "Attendees", value: 18 },
      ]);
    }, 1000);
  }, []);
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    width: 300,
    height: 300,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
}
