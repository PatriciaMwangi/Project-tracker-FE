import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../features/projects/ProjectsSlice';
import { useNavigate, useParams } from 'react-router-dom';
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
    <div className="project-form" style={{ backgroundColor: '#8c8e91' }}>
      <h2>Edit Project Details</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input 
          type="text" 
          id="name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <label htmlFor="githubUrl">GitHub Link</label>
        <input 
          type="url" 
          id="githubUrl"
          value={githubUrl} 
          onChange={(e) => setGithubUrl(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectFormUpdate;
