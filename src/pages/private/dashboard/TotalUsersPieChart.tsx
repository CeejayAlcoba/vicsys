import { Pie } from "@ant-design/charts";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../firebase/services/userService";

export default function TotalUsersPieChart() {
  const _userService = userService();
  const { data } = useQuery({
    queryKey: ["roleCounts"],
    queryFn: _userService.getUserRolePieChart,
  });

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
