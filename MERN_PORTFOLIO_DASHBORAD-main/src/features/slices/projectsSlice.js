import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const projectsSlice = createSlice({
  name: 'PROJECTS',
  initialState: {
    loading: false,
    error: null,
    message: null,
    projects: [],
    singleProject: [],
  },
  reducers: {
    // GET ALL MY PROJECTS START
    getAllProjectsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.projects = [];
    },
    getAllProjectsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.projects = action.payload;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.projects = state.projects;
    },
    // GET ALL MY PROJECTS END
    addPorjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addPorjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addPorjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deletePorjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletePorjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deletePorjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updatePorjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePorjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updatePorjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetAllProjects(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.projects = state.projects;
    },
    clearAllError(state, action) {
      state.error = null;
    },
  },
});

// GET ALL SKILLS
export const getAllProject = () => async dispatch => {
  dispatch(projectsSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/project/getall',
      { withCredentials: true }
    );
    dispatch(
      projectsSlice.actions.getAllProjectsSuccess(data.searchAllProject)
    );
  } catch (error) {
    dispatch(
      projectsSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};
// CREATE A SKILL
export const addNewProject = myData => async dispatch => {
  dispatch(projectsSlice.actions.addPorjectRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/project/create',
      myData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(data);
    dispatch(projectsSlice.actions.addPorjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectsSlice.actions.addPorjectFailed(error.response.data.message)
    );
  }
};

//delete a skill
export const deleteProject = id => async dispatch => {
  dispatch(projectsSlice.actions.deletePorjectRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectsSlice.actions.deletePorjectSuccess(data.message));
    dispatch(projectsSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectsSlice.actions.deletePorjectFailed(error.response.data.message)
    );
  }
};
// UPDATE PROJECT
export const updateProject = (id, mydata) => async dispatch => {
  dispatch(projectsSlice.actions.updatePorjectRequest());
  try {
    const { data } = await axios.put(
      `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/project/update/${id}`,
      mydata,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(projectsSlice.actions.updatePorjectSuccess(data.message));
    dispatch(projectsSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectsSlice.actions.updatePorjectFailed(error.response.data.message)
    );
  }
};

//reset my skill
export const resetAllProjects = () => dispatch => {
  dispatch(projectsSlice.actions.resetAllProjects());
};
export const clearAllProjectError = () => dispatch => {
  dispatch(projectsSlice.actions.clearAllError());
};

export default projectsSlice.reducer;
