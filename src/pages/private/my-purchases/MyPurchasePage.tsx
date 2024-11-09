import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import useUserContext from "../../../contexts/useUserContext";
import userService from "../../../firebase/services/userService";
import { IMyPuchaseEvent } from "../../../interfaces/firebase/INonTechUser";
import eventService from "../../../firebase/services/eventService";
import { TicketStatus } from "../../../interfaces/firebase/ITicket";
import { TicketStatusText } from "../../../components/TicketStatusText";
import TicketQrCodeModal from "../../../components/TicketQrCodeModal";
export default function MyPurchasePage() {
  const { user } = useUserContext();
  console.log(user);
  const _userService = userService();
  const _eventService = eventService();
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: async () => await _userService.getById(user?.uid ?? ""),
  });
  const [isQrModalVisible, setIsQrModalVisible] = useState<boolean>(false);
  const [selectedPurchase, setSelectedPurchase] =
    useState<IMyPuchaseEvent | null>(null);

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: _eventService.getAll,
  });
  const hadnleGetEventNameById = (eventId: string) => {
    return events?.find((e) => e.id == eventId)?.eventName;
  };
  const columns: ColumnsType<IMyPuchaseEvent> = [
    {
      title: "Event",
      dataIndex: "eventId",
      width: 600,
      render: (eventId: string) => (
        <span>{hadnleGetEventNameById(eventId)}</span>
      ),
    },
    {
      title: "location",
      dataIndex: "location",
      width: 600,
    },
    {
      title: "ticketName",
      dataIndex: "ticketName",
      width: 600,
    },
    {
      title: "status",
      dataIndex: "status",
      width: 600,
      render: (status: TicketStatus) => <TicketStatusText status={status} />,
    },
    {
      title: "ticketName",
      dataIndex: "ticketName",
      width: 600,
    },
    {
      title: " QR code",
      width: 300,
      render: (data: IMyPuchaseEvent) => (
        <>
          <Button
            type="primary"
            shape="round"
            icon={<EyeOutlined />}
            onClick={() => {
              setIsQrModalVisible(true);
              setSelectedPurchase(data);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <TicketQrCodeModal
        purchaseEvent={selectedPurchase}
        isOpen={isQrModalVisible}
        setIsOpen={setIsQrModalVisible}
      />
      <DataTable dataSource={me?.myPurchaseEvents} columns={columns} />
    </>
  );
}
