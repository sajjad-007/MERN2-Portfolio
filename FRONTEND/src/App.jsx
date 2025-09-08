import "./App.css"
import { ThemeProvider } from './components/theme-provider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';
import { ToastContainer } from 'react-toastify';
import Footer from "./pages/sub-components/Footer";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectView />} />
          </Routes>
          <Footer/>
          <ToastContainer theme="dark"/>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
