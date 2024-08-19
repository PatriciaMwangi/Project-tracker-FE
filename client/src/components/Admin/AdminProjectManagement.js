import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  addProject,
  deleteProject,
  updateProject,
  fetchSingleProject
} from '../../features/projects/ProjectsSlice';

const AdminProjectManagement = () => {
  const [projectName, setProjectName] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  const dispatch = useDispatch();
  
  // Ensuring that the projects array is always initialized
  const projects = useSelector((state) => state.projects.projects || []);  
  const project = useSelector((state) => state.projects.singleProject);
  const loading = useSelector((state) => state.projects.status === 'loading');
  const error = useSelector((state) => state.projects.error);

  // Fetch all projects on component mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Handle form submit for both adding and updating projects
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProjectId) {
      dispatch(updateProject({ id: editProjectId, updatedProject: { name: projectName } }));
    } else {
      dispatch(addProject({ name: projectName }));
    }
    setProjectName('');
    setEditProjectId(null);
  };

  // Handle edit action, fetch project and set it for editing
  const handleEdit = (id) => {
    dispatch(fetchSingleProject(id));
    setEditProjectId(id);
  };

  // Update the projectName field when project is loaded for editing
  useEffect(() => {
    if (project && editProjectId) {
      setProjectName(project.name);
    }
  }, [project, editProjectId]);

  // Handle project deletion
  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {editProjectId ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <ul className="list-group mt-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
              {project.name}
              <div>
                <button
                  className="btn btn-secondary btn-sm mr-2"
                  onClick={() => handleEdit(project.id)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(project.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminProjectManagement;
