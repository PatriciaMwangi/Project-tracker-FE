import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCohorts, addCohort, setLoading, setError } from '../../features/cohorts/CohortsSlice';

const CohortManagement = () => {
  const [cohort, setCohort] = useState('');
  const dispatch = useDispatch();
  const cohorts = useSelector((state) => state.cohorts.list);
  const loading = useSelector((state) => state.cohorts.loading);
  const error = useSelector((state) => state.cohorts.error);

  useEffect(() => {
    const fetchCohorts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('https://api.example.com/cohorts');
        if (!response.ok) {
          throw new Error('Failed to fetch cohorts');
        }
        const data = await response.json();
        dispatch(setCohorts(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchCohorts();
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cohort.trim()) {
      dispatch(addCohort({ id: Date.now(), name: cohort }));
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
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
