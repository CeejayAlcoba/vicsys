import { Chart, Pie, PieConfig } from "@ant-design/charts";
import { useEffect, useState } from "react";

type DataType = {
  type: string;
  value: number;
};

export default function TotalKidsPieChart() {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setData([
        { type: "Preschool", value: 27 },
        { type: "Todlers", value: 25 },
        { type: "Grade School", value: 18 },
        { type: "Teens", value: 15 },
      ]);
    }, 1000);
  }, []);
  const config: React.PropsWithoutRef<PieConfig> & React.RefAttributes<Chart> =
    {
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
