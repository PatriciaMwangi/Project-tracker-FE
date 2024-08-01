import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../features/projects/projectsSlice';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [contributors, setContributors] = useState('');
  const [admin, setAdmin] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = { name, description, github_link: githubLink, contributors, admin };
    dispatch(addProject(newProject));
  };

  return (
    <div className="project-form">
      <h2>New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>GitHub Link</label>
        <input type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
        <label>Contributors</label>
        <input type="text" value={contributors} onChange={(e) => setContributors(e.target.value)} />
        <label>Admin</label>
        <input type="text" value={admin} onChange={(e) => setAdmin(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ProjectForm;
