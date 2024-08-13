import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../features/projects/ProjectsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { FaGithub } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import './Home.css';

const ProjectFormUpdate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the project data and populate the form fields when component mounts
    fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setDescription(data.description);
        setGithubUrl(data.github_url);
      })
      .catch(error => setError(error.message));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const updatedProject = { name, description, github_url: githubUrl };

    try {
      await dispatch(updateProject({ id, updatedProject })).unwrap();
      navigate('/home');
    } catch (error) {
      setError(error.message || 'Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="project-form bg-white p-4 p-md-5 rounded-lg shadow-lg" style={{ backgroundColor: '#8c8e91' }}>
          <h2 className="text-purple-600 mb-4 d-flex align-items-center">
            <IoMdAdd className="me-2" /> Edit Project Details
          </h2>
          {error && <p className="text-danger mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-purple-600">
                <FaGithub className="me-2" /> Project Name
              </label>
              <input 
                type="text" 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="form-control border-purple-300 rounded-md"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label text-purple-600">
                <MdDescription className="me-2" /> Description
              </label>
              <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                className="form-control border-purple-300 rounded-md"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="githubUrl" className="form-label text-purple-600">
                <FaGithub className="me-2" /> GitHub Link
              </label>
              <input 
                type="url" 
                id="githubUrl"
                value={githubUrl} 
                onChange={(e) => setGithubUrl(e.target.value)} 
                required 
                className="form-control border-purple-300 rounded-md"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#6d28d9', // Purple background
                color: 'white', // White text
                borderRadius: '0.375rem', // Rounded corners
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b21b6'} // Darker purple on hover
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'} // Reset to original purple
            
            >
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
  
};

export default ProjectFormUpdate;