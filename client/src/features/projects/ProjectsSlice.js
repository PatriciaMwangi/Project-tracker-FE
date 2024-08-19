import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from '../auth/AuthSlice';  // Assuming you have an auth slice for token management

const API_URL = 'https://project-tracker-be-jwpt.onrender.com';

// Helper function to get auth headers
const getAuthHeaders = (state) => {
  const token = selectToken(state); // Fetch the token from Redux state
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
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

// Fetch a single project by ID
export const fetchSingleProject = createAsyncThunk('projects/fetchSingleProject', async (id, { getState, rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      headers: getAuthHeaders(getState()),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to fetch project');
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

    return id;  // Return the ID to easily filter it out in the reducer
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
    singleProject: null,   // To store a single project for detailed view
    status: 'idle',        // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,           // Stores any error messages
    inviteStatus: 'idle',  // Tracks the status of invite emails
    inviteError: null,     // Stores invite email errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all projects
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

      // Fetch single project by ID
      .addCase(fetchSingleProject.pending, (state) => {
        state.status = 'loading';
        state.singleProject = null;  // Reset the single project state
      })
      .addCase(fetchSingleProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleProject = action.payload;
      })
      .addCase(fetchSingleProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add project
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);  // Add the new project to the list
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;  // Update the project in the list
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Send invites
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
