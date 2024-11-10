import { useQuery } from "@tanstack/react-query";
import eventService from "../../../firebase/services/eventService";
import BookingEventCard from "./components/EventCard";
import { Button, Switch, Typography } from "antd";
import BookingModal from "./components/BookingModal";
import { useState } from "react";
import { IEvent } from "../../../interfaces/firebase/IEvent";

export default function BookingPage() {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isBookingModalVisible, setIsBookingModalVisible] =
    useState<boolean>(false);
  const _eventService = eventService();
  const { data: events, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: _eventService.getAll,
  });
  return (
    <>
      <BookingModal
        isOpen={isBookingModalVisible}
        setIsOpen={setIsBookingModalVisible}
        selectedEvent={selectedEvent}
        refetch={refetch}
      />
      <Typography>
        <Switch defaultValue={false} onChange={() => {}} /> For Kids
      </Typography>
      <div className="row">
        {events?.map((event) => (
          <div className="col-sm">
            <BookingEventCard
              event={event}
              setSelectedEvent={setSelectedEvent}
              setIsBookingModalVisible={setIsBookingModalVisible}
            />
          </div>
        ))}
      </div>
    </>
  );
}
