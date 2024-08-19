import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCohorts, addNewCohort } from '../../features/cohorts/CohortsSlice';

const CohortManagement = () => {
  const [cohort, setCohort] = useState('');
  const dispatch = useDispatch();
  const cohorts = useSelector((state) => state.cohorts.list);
  const loading = useSelector((state) => state.cohorts.loading);
  const error = useSelector((state) => state.cohorts.error);

  useEffect(() => {
    dispatch(fetchCohorts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cohort.trim()) {
      dispatch(addNewCohort({ id: Date.now(), name: cohort }));
      setCohort('');
    }
  };

  const handleInputChange = (e) => {
    setCohort(e.target.value);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cohortName">Cohort Name:</label>
          <input
            type="text"
            className="form-control"
            id="cohortName"
            placeholder="Enter cohort name"
            value={cohort}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Add Cohort
        </button>
      </form>

      {loading && <p>Loading cohorts...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <ul className="list-group mt-4">
        {cohorts.map((cohort) => (
          <li key={cohort.id} className="list-group-item">
            {cohort.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CohortManagement;
