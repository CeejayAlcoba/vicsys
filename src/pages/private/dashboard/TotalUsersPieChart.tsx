import { Pie } from "@ant-design/charts";
import IPieValue from "../../../interfaces/components/IPieValue";

export default function TotalUsersPieChart(props: { users: IPieValue[] }) {
  const { users } = props;

  const config = {
    data: users,
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
