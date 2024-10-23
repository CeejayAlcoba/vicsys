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
            eventId: "YYFUN2bLM3XRhFaQxJbi",
            ticketBooks: [
              { category: "Attendees", price: 800, totalTickets: 2 },
              { category: "Test", price: 100, totalTickets: 3 },
            ],
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
  const getTotalTicketSold = async () => {
    const tickets = await _ticketRepository.getAll();

    return tickets?.reduce(
      (currT, prevT) =>
        (currT += prevT?.ticketBooks.reduce(
          (curr, prev) => (curr += prev?.totalTickets * prev?.price),
          0
        )),
      0
    );
  };
  return { add, getTotalTicketSold };
}
