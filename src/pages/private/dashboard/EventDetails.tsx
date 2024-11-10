import { Modal, Progress } from "antd";
import { convertUnixToTimeText } from "../../../utils/dateTimeFormat";
import DataTable from "../../../components/DataTable";
import { ColumnsType } from "antd/es/table";
import { IEvent } from "../../../interfaces/firebase/IEvent";
import { useState } from "react";
import MyPurchaseEventCollapse from "../../../components/MyPurchaseEventCollapse";
import { useQuery } from "@tanstack/react-query";
import eventService from "../../../firebase/services/eventService";
import { IUser } from "../../../interfaces/firebase/IUser";

export default function EventDetails() {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const _eventService = eventService();
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: _eventService.getAll,
    initialData: [],
  });
  const { data: nonTechAndUsers, refetch } = useQuery({
    queryKey: ["nonTechAndUsers"],
    queryFn: async () =>
      await _eventService.getAttendeesByEventId(selectedEvent?.id ?? ""),
    initialData: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleClickEvent = async (event: IEvent) => {
    await setSelectedEvent(event);
    await setIsModalOpen(true);
    await refetch();
  };

  return (
    <>
      <EventDetailModal
        refetch={refetch}
        eventName={selectedEvent?.eventName || ""}
        nonTechAndUsers={nonTechAndUsers}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
      {events.map((event, index) => {
        const { image, eventName, endTime, startTime } = event;
        const ticketTotal = event.ticketCategories.reduce(
          (curr, prev) => (curr += prev.ticketTotal),
          0
        );
        const totalTicketRemaining = event.ticketCategories.reduce(
          (curr, prev) => (curr += prev.ticketRemaining ?? 0),
          0
        );
        console.log(event.eventName, event.ticketCategories);
        const ticketBookCount = ticketTotal - totalTicketRemaining;
        const ticketPercent = (ticketBookCount / ticketTotal) * 100;

        return (
          <div
            key={index}
            onClick={() => {
              handleClickEvent(event);
            }}
            className="cursor-pointer"
          >
            <div className="event-item">
              <img
                src={image}
                alt={`${eventName} event`}
                className="w-full object-cover rounded-t-lg"
              />
              <div className="event-details">
                <p className="event-title font-semibold text-lg">{eventName}</p>
                <p className="event-time text-gray-600">
                  {convertUnixToTimeText(startTime)} -{" "}
                  {convertUnixToTimeText(endTime)}
                </p>
                <Progress percent={ticketPercent} showInfo={false} />
                <p className="ticket-count text-sm text-gray-700">
                  {ticketBookCount} / {ticketTotal}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export const EventDetailModal = (props: {
  nonTechAndUsers: IUser[];
  eventName: string;
  isModalOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const {
    eventName,
    nonTechAndUsers = [],
    isModalOpen,
    handleClose,
    refetch,
  } = props;


  const columns: ColumnsType<IUser> = [
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
      title: "My Purchases",
      render: (data: IUser) => {
        return (
          <MyPurchaseEventCollapse
            refetch={refetch}
            userId={data.id ?? ""}
            purchaseEvents={data?.myPurchaseEvents ?? []}
          />
        );
      },
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
