import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    github_link: '',
    contributors: '',
    admin: ''
  });

  useEffect(() => {
    axios.get(`https://project-tracker-24sn7877v-eugine-emoyo-okedi-projects.vercel.app/${id}`)
      .then(response => {
        setProject(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          github_link: response.data.github_link,
          contributors: response.data.contributors.join(', '),
          admin: response.data.admin
        });
      })
      .catch(error => {
        console.error("There was an error fetching the project data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    axios.put(`https://project-tracker-be.vercel.app/projects/${id}`, formData)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error("There was an error updating the project data!", error);
      });
  };

  const handleDelete = () => {
    axios.delete(`https://project-tracker-be.vercel.app/projects/${id}`)
      .then(() => {
        navigate('/projects');
      })
      .catch(error => {
        console.error("There was an error deleting the project data!", error);
      });
  };

  const handleCreate = () => {
    axios.post(`https://project-tracker-be.vercel.app/projects`, formData)
      .then(response => {
        navigate(`/projects/${response.data.id}`);
      })
      .catch(error => {
        console.error("There was an error creating the project data!", error);
      });
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>GitHub Link:</strong> <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></p>
      <p><strong>Contributors:</strong> {project.contributors.join(', ')}</p>
      <p><strong>Admin:</strong> {project.admin}</p>

      <h3>Edit Project</h3>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>GitHub Link:</label>
          <input type="url" name="github_link" value={formData.github_link} onChange={handleChange} />
        </div>
        <div>
          <label>Contributors:</label>
          <input type="text" name="contributors" value={formData.contributors} onChange={handleChange} />
        </div>
        <div>
          <label>Admin:</label>
          <input type="text" name="admin" value={formData.admin} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
      <button type="button" onClick={handleDelete}>Delete</button>

      <h3>Create New Project</h3>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>GitHub Link:</label>
          <input type="url" name="github_link" value={formData.github_link} onChange={handleChange} />
        </div>
        <div>
          <label>Contributors:</label>
          <input type="text" name="contributors" value={formData.contributors} onChange={handleChange} />
        </div>
        <div>
          <label>Admin:</label>
          <input type="text" name="admin" value={formData.admin} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleCreate}>Create</button>
      </form>
    </div>
  );
};

export default ProjectDetails;
