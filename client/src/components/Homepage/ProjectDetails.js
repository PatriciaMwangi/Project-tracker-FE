import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import Navbar from './Navbar';

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

  if (error) return <div className="text-red-500">{error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="project-details bg-white p-8 rounded-lg shadow-lg text-purple-600 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
        <p className="mb-4"><strong>Description:</strong> {project.description}</p>
        <p className="mb-4">
          <strong>GitHub Link:</strong> 
          <a 
            href={project.github_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-500 underline"
          >
            {project.github_url}
          </a>
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Edit Project</h3>
        <ProjectForm initialData={project} onSubmit={handleUpdate} buttonText="Update" />
        
        <button 
          type="button" 
          onClick={handleDelete}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProjectDetails;
