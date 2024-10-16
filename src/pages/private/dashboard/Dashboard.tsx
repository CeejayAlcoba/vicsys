import "./Dashboard.css";
import TotalKidsPieChart from "./TotalKidsPieChart";
import TotalUsersPieChart from "./TotalUsersPieChart";
import CalendarLayout from "./CalendarLayout";

export default function Dashboard() {
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
              <p className="card-text text-center">1152</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total of Kids</h5>
              <p className="card-text text-center">174</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Events</h5>
              <p className="card-text text-center" id="eventCount">
                ...
              </p>
              {/* <!-- Dynamic event count --> */}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total Ticket Sold</h5>
              <p className="card-text text-center">₱3,452</p>
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
              <div className="event-item" data-sold="100" data-total="225">
                <img src="https://via.placeholder.com/50" alt="Event 1" />
                <div className="event-details">
                  <p className="event-title">Youth Bible Study</p>
                  <p className="event-time">9:00am - 4:00pm</p>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <p className="ticket-count">100 / 225</p>
                </div>
              </div>

              <div className="event-item" data-sold="50" data-total="100">
                <img src="https://via.placeholder.com/50" alt="Event 2" />
                <div className="event-details">
                  <p className="event-title">Victory Lipa Church Anniversary</p>
                  <p className="event-time">8:00am - 2:00pm</p>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <p className="ticket-count">50 / 100</p>
                </div>
              </div>
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
