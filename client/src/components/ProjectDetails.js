import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${id}`)
      .then(response => {
        setProject(response.data);
      });
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p><a href={project.github_link}>GitHub Link</a></p>
      <p>Contributors: {project.contributors}</p>
      <p>Admin: {project.admin}</p>
    </div>
  );
};

export default ProjectDetails;
