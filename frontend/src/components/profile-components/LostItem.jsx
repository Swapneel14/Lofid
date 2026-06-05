import React from "react";
import "../../css/Item.css";

function ReportCard({ report }) {
  return (
    <div className="report-card">

      <div className="report-header">

        <h3>{report.itemName}</h3>

        <span
          className={`report-status ${report.status === "Found"
              ? "found"
              : "lost"
            }`}
        >
          {report.status}
        </span>

      </div>

      <div className="report-info">

        <div>
          <span className="label">Category</span>
          <p>{report.category}</p>
        </div>

        <div>
          <span className="label">Location</span>
          <p>
            {report.status === "Lost"
              ? report.lostLocation
              : report.LocationFound}
          </p>
        </div>

        <div>
          <span className="label">Date</span>
          <p>
            {new Date(
              report.lostDate
            ).toLocaleDateString()}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ReportCard;