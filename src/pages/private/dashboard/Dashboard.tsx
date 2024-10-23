import "./Dashboard.css";
import TotalKidsPieChart from "./TotalKidsPieChart";
import TotalUsersPieChart from "./TotalUsersPieChart";
import CalendarLayout from "./CalendarLayout";
import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../../firebase/services/dasboardService";
import moneyFormat from "../../../utils/moneyFormat";
import TicketDetails from "./TicketDetails";

export default function Dashboard() {
  const _dahsboardService = dashboardService();
  const { data } = useQuery({
    queryKey: ["dashboardDetails"],
    queryFn: _dahsboardService.getDashboardDetails,
  });

  console.log(data);
  return (
    <div className="row">
      {/* <!-- Main content --> */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      {/* <!-- Stats Section --> */}
      <div className="row stats">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total Registration</h5>
              <p className="card-text text-center">{data?.totalRegistration}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total of Kids</h5>
              <p className="card-text text-center">{data?.totalKids}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total Events</h5>
              <p className="card-text text-center" id="eventCount">
                {data?.totalEvents}
              </p>
              {/* <!-- Dynamic event count --> */}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total Ticket Sold</h5>
              <p className="card-text text-center">
                ₱{moneyFormat(data?.totalTicketSold || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Ticket Sold Section --> */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Ticket Sold</div>
            <div className="card-body">
              {data?.ticketDetails.map((td) => (
                <TicketDetails {...td} />
              ))}
            </div>
          </div>
        </div>

        {/* <!-- Pie Chart for Total of Kids --> */}
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Total of Kids (Kids Registration)</div>
            <div className="pie-chart">
              <TotalKidsPieChart />
            </div>
          </div>
        </div>

        {/* <!-- Pie Chart for Total Users --> */}
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Total of Users</div>
            <div className="card-body">
              <TotalUsersPieChart />
            </div>
          </div>
        </div>

        {/* <!-- Calendar --> */}
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-header">Calendar</div>
            <CalendarLayout />
          </div>
        </div>
      </div>
    </div>
  );
}
