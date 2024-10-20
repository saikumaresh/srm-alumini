import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import ResumeUpload from './pages/ResumeUpload';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';
import Header from './components/Header';
import OpeningsPage from './pages/OpeningsPage';
import EventsPage from './pages/EventsPage';
import AlumniMap from './pages/AlumniMap';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
      <Header/>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/alumini-maps" element={<AlumniMap />} />
            <Route path="/upload-resume" element={<ResumeUpload />} />
            <Route path="/blog" element={<BlogPage/>} />
            <Route path="/openings" element={<OpeningsPage/>} />
            <Route path="/events" element={<EventsPage/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;