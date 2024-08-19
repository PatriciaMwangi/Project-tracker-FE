import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../features/projects/ProjectsSlice';
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import Navbar from './Navbar';
import './Home.css';
import './Navbar.css';

const Home = () => {
  const dispatch = useDispatch();
  const projectsState = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { projects = [], status = 'idle', error = null } = projectsState || {};

  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('light-theme', !isDarkTheme);
  };

  const handleProfileClick = () => {
    navigate('/userprofile');
  };

  return (
    <div className={`home bg-gradient-to-b ${isDarkTheme ? 'from-purple-400 to-purple-600' : 'from-white to-gray-300'} min-h-screen text-white`}>
      <Navbar />
      <div className="top-icons flex justify-end p-4 space-x-4">
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkTheme ? <FaSun className="text-2xl text-yellow-400" /> : <FaMoon className="text-2xl text-gray-800" />}
        </button>
        <button onClick={handleProfileClick} className="profile-icon">
          <FaUserCircle className="text-2xl text-blue-400" />
        </button>
      </div>
      <div className="cohort-label text-center py-4">
        <p className="text-lg font-semibold">
          {user && user.cohort ? `Cohort: ${user.cohort}` : 'No cohort information available'}
        </p>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">PROJECT TRACKER</h1>
      <div className="search-container flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`search-input w-full max-w-md px-4 py-2 border ${isDarkTheme ? 'border-purple-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
          aria-label="Search projects"
        />
      </div>
      {status === 'loading' && <div className="spinner text-center">Loading projects...</div>}
      {status === 'failed' && (
        <div className="error-message text-center">
          <p>Error: {error}</p>
          <p>Details: {JSON.stringify(error)}</p>
        </div>
      )}
      {status === 'succeeded' && projects.length === 0 && <p>No projects found.</p>}
      {status === 'succeeded' && projects.length > 0 && (
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id} className="project-card bg-white text-purple-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
              <img src={`https://source.unsplash.com/random/300x200?sig=${project.id}`} alt={project.name} className="rounded-t-lg object-cover h-48 w-full"/>
              <h3 className="p-4 text-lg font-semibold">{project.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
