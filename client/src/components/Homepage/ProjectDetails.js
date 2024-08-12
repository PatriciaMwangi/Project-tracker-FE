import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './bootstrap-import.css'

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
    fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data here
        setProject(data);
      })
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Loading...</div>;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: '31rem' ,backgroundColor: '#A020F0'}}>
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <div className="project-details">
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>GitHub Link:</strong> <a href={project.github_url} target="_blank" rel="noopener noreferrer">{project.github_url}</a></p>
            <p><strong>Members:</strong></p>
            <ul>
                {project.users.map(member => (
                    <li key={member.id}>{member.username}</li>
                ))}
            </ul>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleRedirect}>Edit Project</button>
              <button className="btn btn-secondary" onClick={() => navigate('/home')}>Go Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
