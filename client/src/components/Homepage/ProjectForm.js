import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../features/projects/ProjectsSlice';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name, description, github_url: githubUrl };

    try {
      const response = await fetch('https://project-tracker-be-bs7w.onrender.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      const data = await response.json();
      dispatch(addProject(data));
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="project-form">
      <h2>New Project</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <label>GitHub Link</label>
        <input 
          type="url" 
          value={githubUrl} 
          onChange={(e) => setGithubUrl(e.target.value)} 
          required 
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
