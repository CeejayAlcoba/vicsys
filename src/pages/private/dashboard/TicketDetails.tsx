import { Progress } from "antd";
import { ITicketDetails } from "../../../interfaces/firebase/IDashboard";
import { convertUnixToTimeText } from "../../../utils/dateTimeFormat";

export default function TicketDetails(props: ITicketDetails) {
  const { image, eventName, endTime, startTime, totalTickets, ticketSolds } =
    props;
  const ticketPercent = (ticketSolds / totalTickets) * 100;
  return (
    <div className="event-item" data-sold="50" data-total="100">
      <img src={image} alt="Event 2" />
      <div className="event-details">
        <p className="event-title">{eventName}</p>
        <p className="event-time">
          {convertUnixToTimeText(startTime)} - {convertUnixToTimeText(endTime)}
        </p>
        <Progress percent={ticketPercent} showInfo={false} />
        <p className="ticket-count">
          {ticketSolds} / {totalTickets}
        </p>
      </div>
    </div>
  );
}
