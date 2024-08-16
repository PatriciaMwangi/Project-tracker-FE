import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  count: 0,
  loading: false,
  error: null,
};

const cohortsSlice = createSlice({
  name: 'cohorts',
  initialState,
  reducers: {
    setCohorts: (state, action) => {
      state.list = action.payload;
      state.count = action.payload.length;
      state.loading = false;
      state.error = null;
    },
    addCohort: (state, action) => {
      state.list.push(action.payload);
      state.count += 1;
    },
    removeCohort: (state, action) => {
      state.list = state.list.filter(cohort => cohort.id !== action.payload);
      state.count -= 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCohorts, addCohort, removeCohort, setLoading, setError } = cohortsSlice.actions;
export default cohortsSlice.reducer;
