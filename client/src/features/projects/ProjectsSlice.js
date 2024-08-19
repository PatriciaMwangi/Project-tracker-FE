import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from '../auth/AuthSlice';

const API_URL = 'https://project-tracker-be-jwpt.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = (state) => {
  const token = selectToken(state); // Fetch the token from Redux state
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Fetch all projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      headers: getAuthHeaders(getState()),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to fetch projects');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add a new project
export const addProject = createAsyncThunk('projects/addProject', async (project, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(getState()),
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to add project');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update an existing project
export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, updatedProject }, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(getState()),
      body: JSON.stringify(updatedProject),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to update project');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete a project
export const deleteProject = createAsyncThunk('projects/deleteProject', async (id, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(getState()),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to delete project');
    }

    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Send invite emails
export const sendInvites = createAsyncThunk('projects/sendInvites', async ({ emails, projectId }, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/send_invite`, {
      method: 'POST',
      headers: getAuthHeaders(getState()),
      body: JSON.stringify({ emails, project_id: projectId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to send invites');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
    inviteStatus: 'idle', // To track the status of invite emails
    inviteError: null, // To store any invite email errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add Project
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update Project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Send Invites
      .addCase(sendInvites.pending, (state) => {
        state.inviteStatus = 'loading';
        state.inviteError = null;
      })
      .addCase(sendInvites.fulfilled, (state) => {
        state.inviteStatus = 'succeeded';
      })
      .addCase(sendInvites.rejected, (state, action) => {
        state.inviteStatus = 'failed';
        state.inviteError = action.payload;
      });
  },
});

export default projectsSlice.reducer;
