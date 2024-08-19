import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCohort } from '../../features/cohorts/CohortsSlice';
import { useParams } from 'react-router-dom';

const SingleCohortView = () => {
  const { id } = useParams();  // Retrieve the cohort ID from the route params
  const dispatch = useDispatch();
  const cohort = useSelector((state) => state.cohorts.single);
  const loading = useSelector((state) => state.cohorts.loading);
  const error = useSelector((state) => state.cohorts.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleCohort(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading cohort details...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!cohort) {
    return <p>No cohort found</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Cohort Details</h2>
      <p><strong>ID:</strong> {cohort.id}</p>
      <p><strong>Name:</strong> {cohort.name}</p>
      {/* Add any other details related to the cohort */}
    </div>
  );
};

export default SingleCohortView;
