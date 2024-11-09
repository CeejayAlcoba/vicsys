import { Button, Modal, QRCode } from "antd";
import { IMyPuchaseEvent } from "../interfaces/firebase/INonTechUser";
import { convertUnixToDateText } from "../utils/dateTimeFormat";
import documentService from "../firebase/services/documentService";
import eventService from "../firebase/services/eventService";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function TicketQrCodeModal(props: {
  purchaseEvent: IMyPuchaseEvent | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { purchaseEvent, isOpen = false, setIsOpen } = props;
  const _documentService = documentService();
  const _eventService = eventService();
  const {
    data: event,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["event"],
    queryFn: async () =>
      await _eventService.getById(purchaseEvent?.eventId ?? ""),
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen]);

  return (
    <Modal
      title="Qr Code"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      width={400}
      footer={
        <>
          <Button
            type="primary"
            onClick={() =>
              _documentService.downloadHTMLToImage("print", `${uuidv4()}.jpg`)
            }
            disabled={isFetching}
          >
            Download
          </Button>
          <Button
            type="primary"
            onClick={() => reactToPrintFn()}
            disabled={isFetching}
          >
            Print
          </Button>
        </>
      }
    >
      <center ref={contentRef}>
        {event?.image && (
          <img src={event.image} alt="Event" className="img-fluid mb-3" />
        )}
        <center id="print">
          <h3 className="mb-3">{event?.eventName}</h3>
          <p className="mb-1">Venue: {event?.venue}</p>
          <p className="mb-1">
            From: {convertUnixToDateText(event?.startTime)}
          </p>
          <p className="mb-3">To: {convertUnixToDateText(event?.endTime)}</p>

          <div className="qr-code-wrapper mb-4">
            <QRCode
              value={JSON.stringify(purchaseEvent)}
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </center>
      </center>
    </Modal>
  );
}
