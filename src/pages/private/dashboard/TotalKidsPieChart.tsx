import { Chart, Pie, PieConfig } from "@ant-design/charts";
import childrenService from "../../../firebase/services/childrenService";
import { useQuery } from "@tanstack/react-query";

export default function TotalKidsPieChart() {
  const _childrenService = childrenService();
  const { data } = useQuery({
    queryKey: ["childrenCategories"],
    queryFn: _childrenService.getChildrenCategoryPieChart,
  });

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
