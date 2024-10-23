import IDahsboard from "../../interfaces/firebase/IDashboard";
import eventService from "./eventService";
import ticketService from "./ticketService";
import userService from "./userService";

export default function dashboardService() {
  const _eventService = eventService();
  const _userService = userService();
  const _ticketService = ticketService();

  const getDashboardDetails = async (): Promise<IDahsboard> => {
    const totalUsers = await _userService.getTotalUsers();
    const totalTicketSold = await _ticketService.getTotalTicketSold();
    const totalTicketPerEvent = await _eventService.getTotalTicketPerEvent();
    const totalEvents = await _eventService.getTotalEvents();

    const result: IDahsboard = {
      totalRegistration: totalUsers,
      totalKids: 0,
      totalEvents: totalEvents,
      totalTicketSold: totalTicketSold,
      ticketDetails: totalTicketPerEvent,
      totalKidsPieDetails: [],
      totalUserPieChart: [],
    };
    return result;
  };

  return {
    getDashboardDetails,
  };
}
