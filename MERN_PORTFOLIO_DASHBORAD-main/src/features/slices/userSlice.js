import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdate: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.user = {};
      state.isAuthenticated = false;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    //logged in user data get
    getUserRequest(state, action) {
      state.loading = true;
      state.user = {};
      state.isAuthenticated = false;
      state.error = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    //logout in user data get
    logoutRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.error = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    //manage update profile
    updateProfileRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isUpdate = false;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.isUpdate = true;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isUpdate = false;
    },
    resetProfileAfterUpdate(state, action) {
      state.isUpdate = false;
      state.error = null;
      state.message = null;
    },
    // UPDATE PASSWORD
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isUpdate = false;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.isUpdate = true;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isUpdate = false;
    },

    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

// log in api
export const login = (email, password) => async dispatch => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/login',
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error?.response?.data?.message));
    console.error('error from login slice', error);
  }
};
// get user information api
export const getLoginUser = () => async dispatch => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const { data } = await axios.get(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/getuser',
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.getUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.getUserFailed(
        error?.response?.data?.message || error.message
      )
    );
    console.error('error from login slice', error);
  }
};
//log out route api
export const logoutUser = () => async dispatch => {
  dispatch(userSlice.actions.logoutRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/logout',
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error?.response?.data?.message));
    console.error('error from logout slice', error);
  }
};
// profile update api
export const updateProfile = myData => async dispatch => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/updateProfile',
      myData, // x(warning) => don't use {mydata} fomr-data in curly bracket  the server receives a nested structure instead of the actual FormData.
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error?.response?.data?.message)
    );
    console.error('error from manage skill', error);
  }
};
// profile update api
export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async dispatch => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/password/update',
        { currentPassword, newPassword, confirmPassword }, // x(warning) => don't use {mydata} form-data in curly bracket  the server receives a nested structure instead of the actual FormData.
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error?.response?.data?.message)
      );
      console.error('error from manage skill', error);
    }
  };
// reset your profile after you updated your profile
export const resetProfile = () => async dispatch => {
  dispatch(userSlice.actions.resetProfileAfterUpdate());
};
export const clearallErrors = () => async dispatch => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
