import documentRepository from "../repositories/documentRepository";
import ticketRepository from "../repositories/ticketRepository";
import { ITIcket } from "../../interfaces/firebase/ITicket";

export default function ticketService() {
  const _documentRepository = documentRepository();
  const _ticketRepository = ticketRepository();

  const add = async (canvas: HTMLCanvasElement, fileName: string) => {
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "qrcode.png", { type: "image/png" });
          const { url } = await _documentRepository.uploadToFirebase(
            file,
            `qrcodes/${fileName}`
          );
          const entity: ITIcket = {
            created: new Date(),
            qrcodeUrl: url,
          };
          await _ticketRepository.add(entity);
        }
      }, "image/png");
    } catch (error) {
      throw new Error(`Error uploading: ${error}`);
    }
  };

  return { add };
}
