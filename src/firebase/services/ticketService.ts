import documentRepository from "../repositories/documentRepository";
import ticketRepository from "../repositories/ticketRepository";
import { v4 as uuidv4 } from "uuid";
import eventService from "./eventService";
import userService from "./userService";
export default function ticketService() {
  const _documentRepository = documentRepository();
  const _ticketRepository = ticketRepository();
  const _eventService = eventService();
  const _userService = userService();
  const add = async (canvas: HTMLCanvasElement) => {
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "qrcode.png", { type: "image/png" });
          const { url } = await _documentRepository.uploadToFirebase(
            file,
            `qrcodes/${uuidv4()}.png`
          );

          const userId = "UoVb7s3pOnWGLaYVIILDaf5Y2Sx1";
          const eventId = "YYFUN2bLM3XRhFaQxJbi";
          await _eventService.addAttendee(eventId, userId);
          await _userService.addMyPurchaseEvents(userId, {
            eventId: eventId,
            ticketCategoryId: "HLl9GMU7xUkEXTjzk50i",
            price: 800,
            totalTickets: 2,
            qrcodeUrl: url,
          });
        }
      }, "image/png");
    } catch (error) {
      throw new Error(`Error uploading: ${error}`);
    }
  };
  const getTotalTicketSold = async () => {
    const users = await _userService.getAll();

    return users?.reduce((currT, user) => {
      if (!user?.myPurchaseEvents || user.myPurchaseEvents.length === 0) {
        return currT;
      }

      const userTotal = user.myPurchaseEvents.reduce((curr, event) => {
        return curr + (event?.totalTickets ?? 0) * (event?.price ?? 0);
      }, 0);

      return currT + userTotal;
    }, 0);
  };
  return { add, getTotalTicketSold };
}
