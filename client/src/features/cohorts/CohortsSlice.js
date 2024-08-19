import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "https://project-tracker-be-jwpt.onrender.com";

// Thunk to fetch all cohorts
export const fetchCohorts = createAsyncThunk(
  'cohorts/fetchCohorts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/cohorts`);
      if (!response.ok) {
        throw new Error('Failed to fetch cohorts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a new cohort
export const addNewCohort = createAsyncThunk(
  'cohorts/addNewCohort',
  async (cohort, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/cohorts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cohort),
      });
      if (!response.ok) {
        throw new Error('Failed to add cohort');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to delete a cohort
export const deleteCohort = createAsyncThunk(
  'cohorts/deleteCohort',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/cohorts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete cohort');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch a single cohort by ID
export const fetchSingleCohort = createAsyncThunk(
  'cohorts/fetchSingleCohort',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/cohorts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cohort');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  list: [],        // List of cohorts
  single: null,    // Single cohort to view details
  count: 0,
  loading: false,  // Loading state
  error: null,     // Error state
};

// Cohorts slice
const cohortsSlice = createSlice({
  name: 'cohorts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all cohorts
      .addCase(fetchCohorts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCohorts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.count = action.payload.length;
        state.loading = false;
      })
      .addCase(fetchCohorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add a new cohort
      .addCase(addNewCohort.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewCohort.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.count += 1;
        state.loading = false;
      })
      .addCase(addNewCohort.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a cohort
      .addCase(deleteCohort.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCohort.fulfilled, (state, action) => {
        state.list = state.list.filter(cohort => cohort.id !== action.payload);
        state.count -= 1;
        state.loading = false;
      })
      .addCase(deleteCohort.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch a single cohort by ID
      .addCase(fetchSingleCohort.pending, (state) => {
        state.loading = true;
        state.single = null;  // Reset single cohort state
      })
      .addCase(fetchSingleCohort.fulfilled, (state, action) => {
        state.single = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleCohort.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cohortsSlice.reducer;
