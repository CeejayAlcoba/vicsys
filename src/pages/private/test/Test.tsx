import useTicketQrContext from "../ticket/qr/useTicketQrContext";

export default function Test() {
  const { open } = useTicketQrContext();
  const handleGenerateAndSaveTicketQr = async () => {
    open("test-somthing");
  };

  return <button onClick={handleGenerateAndSaveTicketQr}>Generate Qr</button>;
}
