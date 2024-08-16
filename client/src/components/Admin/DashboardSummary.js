import React from 'react';

const DashboardSummary = ({ cohortCount, projectCount }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Number of Cohorts</h5>
            <p className="card-text">{cohortCount}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Number of Projects</h5>
            <p className="card-text">{projectCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
