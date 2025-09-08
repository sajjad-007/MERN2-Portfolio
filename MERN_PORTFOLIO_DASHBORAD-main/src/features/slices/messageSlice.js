import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    error: null,
    messages: [], //my real messages values will be stored in here
    message: null, // for toastify message
  },
  reducers: {
    getAllMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.messages = []; // real message values
    },
    getAllMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    },
    getAllMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.messages = state.messages;
    },
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null; //for toasify message
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload; //for toasify message
      state.error = null;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //after deleting a message we have reset it
    resetAllMessage(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = state.messages; //real message values
      state.message = null;
    },
    clearMessageAllErrors(state, action) {
      state.error = null;
    },
  },
});

export const getAllMessage = () => async dispatch => {
  dispatch(messageSlice.actions.getAllMessageRequest());
  try {
    const { data } = await axios.get(
      'https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/message/getall',
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.getAllMessageSuccess(data.myMessages));
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessageFailed(error.response.data.message)
    );
    console.log(error);
  }
};
export const deleteMessage = id => async dispatch => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-portfolio-backend-2-zki2.onrender.com/api/v1/message/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
    console.log(error);
  }
};
export const resetAllMessage = () => dispatch => {
  dispatch(messageSlice.actions.resetAllMessage());
};
export const clearAllMessages = () => dispatch => {
  dispatch(messageSlice.actions.clearAllMessages());
};

export default messageSlice.reducer;
