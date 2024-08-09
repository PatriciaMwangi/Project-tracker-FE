import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../features/projects/ProjectsSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const newProject = { name, description, github_url: githubUrl };

    try {
      await dispatch(addProject(newProject)).unwrap();
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
     <div className="project-form">
      
      <h2>New Project</h2>
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
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>
    </div>
    
    </>
   
  );
};

export default ProjectForm;
