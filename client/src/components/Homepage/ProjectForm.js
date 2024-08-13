import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../features/projects/ProjectsSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './ProjectForm.css'; // Import custom CSS file
import { FaGithub } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';


const ProjectForm = ({ initialData = {}, onSubmit, buttonText = "Add Project" }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.name || '');
  const [githubUrl, setGithubUrl] = useState(initialData.githubUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newProject = { name, description, github_url: githubUrl };

console.log(newProject,'newProject')

try {
  if (onSubmit) {
    await onSubmit(newProject);
  } else {
    await dispatch(addProject(newProject)).unwrap();
    navigate('/invite-me');
  }
} catch (error) {
  setError(error.message || 'Failed to add project');
} finally {
  setLoading(false);
}
};


return (
  <>
    <Navbar />
    <div className="container mt-5">
      <div className="project-form bg-white p-4 p-md-5 rounded-lg shadow-lg">
        <h2 className="text-purple-600 mb-4 d-flex align-items-center">
          <IoMdAdd className="me-2" /> {buttonText}
        </h2>
        {error && <p className="text-danger mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-purple-600">
              <FaGithub className="me-2" /> Project Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="form-control border-purple-300 rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label text-purple-600">
              <MdDescription className="me-2" /> Description
            </label>
            <textarea 
              id="description"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="form-control border-purple-300 rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="githubUrl" className="form-label text-purple-600">
              <FaGithub className="me-2" /> GitHub Link
            </label>
            <input 
              type="url" 
              id="githubUrl"
              value={githubUrl} 
              onChange={(e) => setGithubUrl(e.target.value)} 
              required 
              className="form-control border-purple-300 rounded-md"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-purple w-100"
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </form>
      </div>
    </div>
  </>
);
};

export default ProjectForm;
