import React  from "react";
import "../../css/LostItem.css";

function LostReportCard({ report }) {
  return (
    <div className="report-card">

      <div className="report-card-header">
        <h3>{report.itemName}</h3>

        <span className="report-status">
          {report.status}
        </span>
      </div>

      <div className="report-card-body">

        <div className="report-field">
          <span className="field-label">Category</span>
          <span className="field-value">
            {report.category}
          </span>
        </div>

        <div className="report-field">
          <span className="field-label">Location</span>
          <span className="field-value">
            {report.lostLocation}
          </span>
        </div>

        <div className="report-field">
          <span className="field-label">Date</span>
          <span className="field-value">
            {new Date(report.lostDate).toLocaleDateString()}
          </span>
        </div>

        <div className="report-field">
          <span className="field-label">Time</span>
          <span className="field-value">
            {report.lostTime}
          </span>
        </div>

      </div>

      <div className="report-description">
        {report.description}
      </div>

    </div>
  );
}

export default LostReportCard;