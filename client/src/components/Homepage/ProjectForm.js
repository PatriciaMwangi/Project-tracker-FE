import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [contributors, setContributors] = useState('');
  const [admin, setAdmin] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = { name, description, github_link: githubLink, contributors, admin };
    dispatch(addProject(newProject));
    navigate('/');
  };

  return (
    <div className="project-form">
      <h2>New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>GitHub Link</label>
        <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} required />
        <label>Contributors</label>
        <input type="text" value={contributors} onChange={(e) => setContributors(e.target.value)} required />
        <label>Admin</label>
        <input type="text" value={admin} onChange={(e) => setAdmin(e.target.value)} required />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;