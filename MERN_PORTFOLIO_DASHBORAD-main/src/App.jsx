import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkill from './pages/ManageSkill';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getLoginUser } from './features/slices/userSlice';
import { useEffect } from 'react';
import { getAllMessage } from './features/slices/messageSlice';
import { gettAllTimeline } from './features/slices/addTimelineSlice';
import { getAllSkill } from './features/slices/addSkills';
import { getAllSoftwareApplication } from './features/slices/addSoftwareApplication';
import { getAllProject } from './features/slices/projectsSlice';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginUser());
    dispatch(getAllMessage());
    dispatch(gettAllTimeline());
    dispatch(getAllSkill());
    dispatch(getAllProject());
    dispatch(getAllSoftwareApplication());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkill />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/view/project/:id" element={<ViewProject/>} />
        <Route path="/update/project/:id" element={<UpdateProject/>}/>
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </Router>
  );
}

export default App;
