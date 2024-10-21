import { Button, Card } from "antd";
import { IEvent } from "../../../../interfaces/firebase/IEvent";
import { convertUnixToDateText } from "../../../../utils/dateTimeFormat";
import useEventContext from "../useEventContext";

export default function EventCard(props: IEvent) {
  const {
    eventName,
    image,
    description,
    ticketCategories,
    venue,
    startTime,
    endTime,
  } = props;
  const {
    handleDeleteConfirmation,
    setSelectedEvent,
    setIsSaveModalOpen,
    setImageUpload,
  } = useEventContext();
  return (
    <Card
      style={{ width: 350, marginBottom: 20 }}
      cover={
        <img alt={eventName} src={image} style={{ width: 350, height: 150 }} />
      }
      actions={[
        <Button
          type="primary"
          onClick={() => {
            setImageUpload(null);
            setSelectedEvent(props);
            setIsSaveModalOpen(true);
          }}
        >
          View and Edit
        </Button>,
        <Button
          danger
          onClick={() => {
            setSelectedEvent(props);
            handleDeleteConfirmation();
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <h4>{eventName}</h4>
      <p>{description}</p>
      <p>
        <strong>Date and Time: </strong>
        {convertUnixToDateText(startTime)}-{convertUnixToDateText(endTime)}
      </p>
      <p>
        <strong>Venue: </strong>
        {venue}
      </p>
      <p>
        <strong>Available Tickets by Category: </strong>
      </p>
      {ticketCategories?.map((ticket, index) => (
        <p key={index}>
          {ticket.category} - ₱{ticket.price}
          <br />
          Tickets Available: {ticket.totalTickets}
        </p>
      ))}
    </Card>
  );
}
