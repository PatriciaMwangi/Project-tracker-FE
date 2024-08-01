import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../features/projects/projectsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search projects"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="projects">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={`https://source.unsplash.com/random/200x200?sig=${project.id}`} alt={project.name} />
            <h3>{project.name}</h3>
            <Link to={`/project/${project.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
