import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../features/projects/ProjectsSlice';
import Navbar from './Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log('Current state:', { projects, status, error });
  }, [projects, status, error]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <Navbar />
      <h1>PROJECTS</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {status === 'loading' && <p>Loading projects...</p>}
      {status === 'failed' && (
        <div>
          <p>Error: {error}</p>
          <p>Details: {JSON.stringify(error)}</p>
        </div>
      )}
      {status === 'succeeded' && projects.length === 0 && <p>No projects found.</p>}
      {status === 'succeeded' && projects.length > 0 && (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id} className="project-card">
              <img src={`https://source.unsplash.com/random/300x200?sig=${project.id}`} alt={project.name} />
              <h3>{project.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
