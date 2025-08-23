import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import InternshipsPage from './pages/InternshipsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import Chatbot from './components/chatbot';
import Resume from './components/resume';
import Records from './components/records';
import InterviewPage from './components/InterviewPage'; // ✅ Importing InterviewPage
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
          <Navigation />
          <main className="flex-grow pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/careers" element={<ProtectedRoute><CareersPage /></ProtectedRoute>} />
              <Route path="/internships" element={<ProtectedRoute><InternshipsPage /></ProtectedRoute>} />
              <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
              <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
              <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />

              {/* ✅ New AI Interview Page */}
              <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
