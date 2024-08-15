// src/components/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import DashboardSummary from './DashboardSummary';

const Dashboard = () => {
  const cohortCount = useSelector(state => state.cohorts?.count || 0);
  const projectCount = useSelector(state => state.projects?.count || 0);

  return (
    <div className="container mt-4">
      <DashboardSummary cohortCount={cohortCount} projectCount={projectCount} />
      <div className="row">
        <div className="col-md-4"><BarChart /></div>
        <div className="col-md-4"><LineChart /></div>
        <div className="col-md-4"><PieChart /></div>
      </div>
    </div>
  );
};

export default Dashboard;
