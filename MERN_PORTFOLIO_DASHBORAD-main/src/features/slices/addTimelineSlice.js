import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const addTimelineSlice = createSlice({
  name: 'addTimeline',
  initialState: {
    loading: false,
    error: null,
    message: null,
    addTimeline: [],
  },
  reducers: {
    getAllTimellineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.addTimeline = [];
    },
    getAllTimellineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.addTimeline = action.payload;
    },
    getAllTimellineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.addTimeline = state.addTimeline;
    },
    // ADD A NEW TIMELINE
    addTimellineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTimellineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addTimellineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // DELETE TIMELINE
    deleteTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetAllTimeline(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.addTimeline = state.addTimeline;
    },
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const gettAllTimeline = () => async dispatch => {
  dispatch(addTimelineSlice.actions.getAllTimellineRequest());
  try {
    const { data } = await axios.get(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/timeline/get',
      { withCredentials: true }
    );
    dispatch(
      addTimelineSlice.actions.getAllTimellineSuccess(data.getAllTimelineData)
    );
  } catch (error) {
    dispatch(
      addTimelineSlice.actions.getAllTimellineFailed(
        error.response.data.message
      )
    );
  }
};
// ADD NEW TIMELINE
export const addNewTimeline = timelineData => async dispatch => {
  dispatch(addTimelineSlice.actions.addTimellineRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/timeline/create',
      timelineData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(addTimelineSlice.actions.addTimellineSuccess(data.message));
    dispatch(addTimelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      addTimelineSlice.actions.addTimellineFailed(error.response.data.message)
    );
  }
};
export const deleteATimeline = id => async dispatch => {
  dispatch(addTimelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(addTimelineSlice.actions.deleteTimelineSuccess(data.message));
    dispatch(addTimelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      addTimelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const resetAllTimeline = () => async dispatch => {
  dispatch(addTimelineSlice.actions.resetAllTimeline());
};
export const clearAllTimelineErrors = () => async dispatch => {
  dispatch(addTimelineSlice.actions.clearAllErrors());
};

export default addTimelineSlice.reducer;
