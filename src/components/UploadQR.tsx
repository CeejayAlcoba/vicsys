import { useEffect, useRef } from "react";
import ticketService from "../firebase/services/ticketService";
import { QRCode } from "antd";

interface UploadQrProps {
  value: string;
}
export default function UploadQr(props: UploadQrProps) {
  const { value } = props;
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const _ticketService = ticketService();

  useEffect(() => {
    handleAddTicket();
  }, []);
  const handleAddTicket = async () => {
    const canvas = qrCodeRef.current?.querySelector("canvas");

    if (canvas) {
      await _ticketService.add(canvas, "sample-web-qr.png");
    }
  };

  return (
    <div>
      <div ref={qrCodeRef} style={{ background: "transparent" }}>
        <QRCode value={value} style={{ backgroundColor: "transparent" }} />
      </div>
    </div>
  );
}
