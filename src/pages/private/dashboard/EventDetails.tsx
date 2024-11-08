import { Modal, Progress } from "antd";
import { convertUnixToTimeText } from "../../../utils/dateTimeFormat";
import DataTable from "../../../components/DataTable";
import { ColumnsType } from "antd/es/table";
import { IEvent, IEventUser } from "../../../interfaces/firebase/IEvent";
import { useEffect, useState } from "react";

export default function EventDetails(props: IEvent) {
  const { image, eventName, endTime, startTime, ticketCategories } = props;

  const [totals, setTotals] = useState({ ticketTotal: 0, ticketSold: 0 });

  useEffect(() => {
    const ticketTotal = ticketCategories.reduce(
      (curr, prev) => (curr += prev.ticketTotal),
      0
    );
    const ticketSold = ticketCategories.reduce(
      (curr, prev) => (curr += prev.ticketSold),
      0
    );
    setTotals({
      ticketTotal,
      ticketSold,
    });
  }, [ticketCategories]);
  console.log(ticketCategories);

  const ticketPercent = (totals.ticketSold / totals.ticketTotal) * 100;

  return (
    <>
      <div className="event-item" data-sold="50" data-total="100">
        <img src={image} alt="Event 2" />
        <div className="event-details">
          <p className="event-title">{eventName}</p>
          <p className="event-time">
            {convertUnixToTimeText(startTime)} -{" "}
            {convertUnixToTimeText(endTime)}
          </p>
          <Progress percent={ticketPercent} showInfo={false} />
          <p className="ticket-count">
            {totals.ticketSold} / {totals.ticketTotal}
          </p>
        </div>
      </div>
    </>
  );
}

export const EventDetailModal = (props: {
  nonTechAndUsers: IEventUser[];
  eventName: string;
  isModalOpen: boolean;
  handleClose: () => void;
}) => {
  const { eventName, nonTechAndUsers = [], isModalOpen, handleClose } = props;

  const columns: ColumnsType<IEventUser> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Ministry",
      dataIndex: "ministry",
    },
    {
      title: "Ticket Category",
      dataIndex: "ticketName",
    },
    {
      title: "Status",
      dataIndex: "ticketStatus",
    },
  ];
  return (
    <Modal
      title={`${eventName} Attendees`}
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      width={1200}
    >
      <DataTable dataSource={nonTechAndUsers} columns={columns} />
      <h6>Total: {nonTechAndUsers.length}</h6>
    </Modal>
  );
};
