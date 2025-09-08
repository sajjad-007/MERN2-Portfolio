import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import passForgotResetReducer from './slices/passForgotResetSlice';
import messageReducer from './slices/messageSlice';
import addTimelineReducer from './slices/addTimelineSlice';
import addSkillReducer from './slices/addSkills';
import softwareApplicationReducer from './slices/addSoftwareApplication';
import projectReducer from './slices/projectsSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    passwordForgotReset: passForgotResetReducer,
    message: messageReducer,
    timeline: addTimelineReducer,
    skill: addSkillReducer,
    application: softwareApplicationReducer,
    project: projectReducer
  },
});
