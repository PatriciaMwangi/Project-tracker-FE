import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  const handleRedirect = () => {
    if (project) {
      navigate(`/project/update/${project.id}`);
    }
  };


  useEffect(() => {
    fetch(`https://project-tracker-be-jwpt.onrender.com/projects/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProject(data))
      .catch(error => setError(error.message));
  }, [id]);

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
        <button 
          type="button" 
          onClick={handleRedirect}
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
          Edit Project
        </button>
      </div>
    </>
  );
};

export default ProjectDetails;
