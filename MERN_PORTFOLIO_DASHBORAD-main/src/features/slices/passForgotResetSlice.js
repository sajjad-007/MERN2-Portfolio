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
    forgotPasswordRequest(state, action) {
      (state.loading = true), (state.message = null), (state.error = null);
    },
    forgotPasswordSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload),
        (state.error = null);
    },
    forgotPasswordFailed(state, action) {
      (state.loading = false),
        (state.message = null),
        (state.error = action.payload);
    },
    //logged in user data get
    resetPasswordRequest(state, action) {
      (state.loading = true), (state.message = null), (state.error = null);
    },
    resetPasswordSuccess(state, action) {
      (state.loading = false),
        (state.message = action.payload),
        (state.error = null);
    },
    resetPasswordFailed(state, action) {
      (state.loading = false),
        (state.message = null),
        (state.error = action.payload);
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const forgotPassword = email => async dispatch => {
  dispatch(passForgotResetSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/password/forget',
      { email },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch(passForgotResetSlice.actions.forgotPasswordSuccess(data.message));
    console.log('success from forgot password:', data);
    dispatch(passForgotResetSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message;
    dispatch(passForgotResetSlice.actions.forgotPasswordFailed(errorMessage));
    console.error('error from login slice', error);
  }
};
export const resetPassword =
  (password, confirmPassword, token) => async dispatch => {
    dispatch(passForgotResetSlice.actions.resetPasswordRequest());
    try {
      const { data } = await axios.post(
        `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/user/password/reset/${token}`,
        {
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(passForgotResetSlice.actions.resetPasswordSuccess(data.message));
      dispatch(passForgotResetSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        passForgotResetSlice.actions.resetPasswordFailed(
          error?.response?.data?.message || error.message
        )
      );
      console.error('error from reset password slice', error);
    }
  };

export const clearallPasswordErrors = () => async dispatch => {
  dispatch(passForgotResetSlice.actions.clearAllErrors());
};

export default passForgotResetSlice.reducer;
