import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const passForgotResetSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    // manage skill
    manageSkillRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = null);
      state.message = null;
    },
    manageSkillSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.error = null);
      state.message = action.payload;
    },
    manageSkillFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.error = action.payload);
      state.message = null;
    },
    //manage time line
    manageTimelineRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = null);
      state.message = null;
    },
    manageTimelineSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.error = null);
      state.message = action.payload;
    },
    manageTimelineFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.error = action.payload);
      state.message = null;
    },
    //manage projects
    manageProjectsRequest(state, action) {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = null);
      state.message = null;
    },
    manageProjectsSuccess(state, action) {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.error = null);
      state.message = action.payload;
    },
    manageProjectsFailed(state, action) {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.error = action.payload);
      state.message = null;
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const manageSkill = () => async dispatch => {
  dispatch(userSlice.actions.manageSkillRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/addSkill/create',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.manageSkillSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.manageSkillFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from manage skill', error);
  }
};

export const manageTimeline = () => async dispatch => {
  dispatch(userSlice.actions.manageTimelineRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/timeline/create',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.manageTimelineSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.manageTimelineFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from manage skill', error);
  }
};
export const manageProject = () => async dispatch => {
  dispatch(userSlice.actions.manageProjectsRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/project/create',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.manageProjectsSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.manageProjectsFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from manage skill', error);
  }
};

export const clearallPasswordErrors = () => async dispatch => {
  dispatch(passForgotResetSlice.actions.clearAllErrors());
};

export default passForgotResetSlice.reducer;
