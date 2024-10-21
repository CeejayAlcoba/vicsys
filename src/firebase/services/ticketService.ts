import documentRepository from "../repositories/documentRepository";
import ticketRepository from "../repositories/ticketRepository";
import { ITIcket } from "../../interfaces/firebase/ITicket";
import { v4 as uuidv4 } from "uuid";
export default function ticketService() {
  const _documentRepository = documentRepository();
  const _ticketRepository = ticketRepository();

  const add = async (canvas: HTMLCanvasElement) => {
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "qrcode.png", { type: "image/png" });
          const { url } = await _documentRepository.uploadToFirebase(
            file,
            `qrcodes/${uuidv4()}.png`
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
