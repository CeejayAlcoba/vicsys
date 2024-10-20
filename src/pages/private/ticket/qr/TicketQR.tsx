import { Button, QRCode } from "antd";
import { useEffect, useRef, useState } from "react";
import ticketService from "../../../../firebase/services/ticketService";
import { useParams } from "react-router-dom";
import documentService from "../../../../firebase/services/documentService";
import PageLoading from "../../../../components/PageLoading";

export default function TicketQR() {
  const { value = "" } = useParams<{ value: string }>();
  const [isGenerated, setIsGenerated] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeLayoutRef = useRef<HTMLDivElement>(null);
  const _ticketService = ticketService();
  const _documentService = documentService();

  useEffect(() => {
    handleAddTicket();

    return () => {};
  }, []);

  const handleAddTicket = async () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");
    if (canvas && !isGenerated) {
      await _ticketService.add(canvas, "sample-web-qr.png").then(() => {
        setIsGenerated(true);
      });
    }
  };
  if (!isGenerated) return <PageLoading />;

  return (
    <div>
      <div ref={qrCodeLayoutRef} style={{ background: "white" }}>
        <h1>Test QR layout</h1>
        <div ref={qrCodeRef} style={{ background: "transparent" }}>
          <QRCode value={value} style={{ backgroundColor: "transparent" }} />
        </div>
      </div>

      <Button
        type="primary"
        onClick={() => _documentService.downloadHTMLToImage(qrCodeLayoutRef)}
      >
        Download QR Code
      </Button>
    </div>
  );
}
