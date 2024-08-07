import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProject(data))
      .catch(error => setError(error.message));
  }, [id]);

  const handleUpdate = (updatedProject) => {
    fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProject)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProject(data))
      .catch(error => setError(error.message));
  };

  const handleDelete = () => {
    fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/projects'))
      .catch(error => setError(error.message));
  };

  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>GitHub Link:</strong> <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></p>

      <h3>Edit Project</h3>
      <ProjectForm initialData={project} onSubmit={handleUpdate} buttonText="Update" />
      <button type="button" onClick={handleDelete}>Delete</button>

      <h3>Create New Project</h3>
      <ProjectForm initialData={{ name: '', description: '', github_link: '' }} onSubmit={handleUpdate} buttonText="Create" />
    </div>
  );
};

export default ProjectDetails;
