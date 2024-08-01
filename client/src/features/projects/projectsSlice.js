import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get('http://localhost:5000/projects');
  return response.data;
});

export const addProject = createAsyncThunk('projects/addProject', async (newProject) => {
  const response = await axios.post('http://localhost:5000/projects', newProject);
  return response.data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default projectsSlice.reducer;
