import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { data } from 'react-router-dom';

const softwareApplicationSlice = createSlice({
  name: 'Software Application',
  initialState: {
    softwareApplication: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.softwareApplication = [];
    },
    getAllSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.softwareApplication = action.payload;
    },
    getAllSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.softwareApplication = state.softwareApplication;
    },
    addSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetAllSoftwareApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.softwareApplication = state.softwareApplication;
      state.message = null;
    },
    clearAllError(state, action) {
      state.error = null;
    },
  },
});

export const getAllSoftwareApplication = () => async dispatch => {
  dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationRequest());
  try {
    const { data } = await axios.get(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/softApplication/get',
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationSuccess(
        data.findAllSoftAppData
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};
export const addSoftwareApplication = myData => async dispatch => {
  dispatch(softwareApplicationSlice.actions.addSoftwareApplicationRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/softApplication/create',
      myData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addSoftwareApplicationSuccess(
        data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addSoftwareApplicationFailed(
        error.response.data.message
      )
    );
    console.log('error from addsoftwareApplication', error);
  }
};
export const deleteSoftwareApplication = id => async dispatch => {
  dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/softApplication/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(
        data.message
      )
    );
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};
export const resetAllSoftwareApplication = () => dispatch => {
  dispatch(softwareApplicationSlice.actions.resetAllSoftwareApplication());
};
export const clearSoftwareApplicationErrors = () => dispatch => {
  dispatch(softwareApplicationSlice.actions.clearAllError());
};

export default softwareApplicationSlice.reducer;
