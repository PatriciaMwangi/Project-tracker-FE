import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetch('https://project-tracker-be-bs7w.onrender.com/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
});

// Add a new project
export const addProject = createAsyncThunk('projects/addProject', async (project) => {
  const response = await fetch('https://project-tracker-be-bs7w.onrender.com/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error('Failed to add project');
  }
  return response.json();
});

// Update an existing project
export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, updatedProject }) => {
  const response = await fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProject),
  });
  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  return response.json();
});

// Delete a project
export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
  const response = await fetch(`https://project-tracker-be-bs7w.onrender.com/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
  return id;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      });
  },
});

export default projectsSlice.reducer;
