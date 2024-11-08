import { Collapse } from "antd";
import { IMyPuchaseEvent } from "../interfaces/firebase/INonTechUser";
import eventService from "../firebase/services/eventService";
import { useQuery } from "@tanstack/react-query";

export default function MyPurchaseEventCollapse(props: {
  purchaseEvents: IMyPuchaseEvent[];
}) {
  const { purchaseEvents } = props;

  const _eventService = eventService();

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: _eventService.getAll,
    initialData: [],
  });
  if (!purchaseEvents?.length) {
    return <span className="text-sm text-gray-500">No events</span>;
  }

  const handleGetEventById = (id: string) => {
    return events.find((e) => e.id == id);
  };
  return (
    <Collapse
      bordered={false}
      size="small"
      className="bg-transparent"
      items={[
        {
          key: "1",
          label: `${purchaseEvents.length} Event${
            purchaseEvents.length > 1 ? "s" : ""
          }`,
          children: (
            <div className="space-y-2">
              {purchaseEvents.map((event) => (
                <div key={event.eventId} className="text-sm row">
                  <span className="font-medium">
                    Event {handleGetEventById(event.eventId)?.eventName}
                  </span>
                  <a
                    // href={event.qrcodeUrl}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View QR Code
                  </a>
                  <span>Status: {event.status}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
