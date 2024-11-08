import { Modal, Progress } from "antd";
import { ITicketDetails } from "../../../interfaces/firebase/IDashboard";
import { convertUnixToTimeText } from "../../../utils/dateTimeFormat";
import DataTable from "../../../components/DataTable";
import { ColumnsType } from "antd/es/table";
import { IUserPublic } from "../../../interfaces/firebase/IUser";


export default function TicketDetails(props: ITicketDetails) {
  const { image, eventName, endTime, startTime, totalTickets, ticketSolds } =
    props;
  const ticketPercent = (ticketSolds / totalTickets) * 100;

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
            {ticketSolds} / {totalTickets}
          </p>
        </div>
      </div>
    </>
  );
}

export const TicketDetailModal = (props: {
  users: IUserPublic[];
  eventName: string;
  isModalOpen: boolean;
  handleClose: () => void;
}) => {
  const { eventName, users, isModalOpen, handleClose } = props;

  const columns: ColumnsType<IUserPublic> = [
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
      dataIndex: "",
    },
    {
      title: "Status",
      dataIndex: "",
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
      <DataTable dataSource={users} columns={columns} />
      <h6>Total: {users.length}</h6>
    </Modal>
  );
};
