import { Row, Col, Button } from "antd";
import EventCard from "./components/EventCard";
import { useQuery } from "@tanstack/react-query";
import eventService from "../../../firebase/services/eventService";
import { useState } from "react";
import { IEvent } from "../../../interfaces/firebase/IEvent";
import Swal from "sweetalert2";
import { EventContext } from "./useEventContext";
import EventSaveModal from "./modals/EventSave";

export default function EventPage() {
  const _eventService = eventService();

  const { data: events, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: _eventService.getAll,
  });

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const handleDeleteConfirmation = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed && selectedEvent?.id) {
        await _eventService.deleteById(selectedEvent.id);
        refetch();
        Swal.fire({
          icon: "success",
          title: "Successfully deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,
        isSaveModalOpen,
        setIsSaveModalOpen,
        imageUpload,
        setImageUpload,
        handleDeleteConfirmation,
        refetch,
      }}
    >
      <EventSaveModal />
      <div className="d-flex justify-content-between">
        <h1>Events</h1>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setSelectedEvent(null);
              setIsSaveModalOpen(true);
              setImageUpload(null);
            }}
          >
            Create Event
          </Button>
        </div>
      </div>

      <Row gutter={5}>
        {events?.map((event, index) => (
          <Col key={index} span={8}>
            <EventCard {...event} />
          </Col>
        ))}
      </Row>
    </EventContext.Provider>
  );
}
