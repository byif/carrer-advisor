import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu as MenuIcon,
  X,
  BookOpen,
  Briefcase,
  GraduationCap,
  Home,
  LogOut,
  Bot,
  Clipboard,
  Table,
  Video
} from 'lucide-react'; // ✅ Added Video icon for Interview
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-extrabold tracking-wide">AI Career Advisor</span>
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-purple-700 transition-all"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <DarkModeToggle />
            <UserMenu user={user} logout={logout} />
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <NavLinks mobile />
            <div className="pt-4 border-t border-indigo-400">
              <UserMenu user={user} logout={logout} mobile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const baseClass = mobile
    ? "flex items-center space-x-2 hover:bg-purple-700 px-3 py-2 rounded-md w-full transition-all"
    : "flex items-center space-x-1 hover:text-yellow-200 transition-all";

  return (
    <div className={mobile ? "flex flex-col space-y-2" : "flex items-center space-x-6"}>
      <Link to="/" className={baseClass}>
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link to="/careers" className={baseClass}>
        <Briefcase className="h-4 w-4" />
        <span>Careers</span>
      </Link>
      <Link to="/internships" className={baseClass}>
        <MenuIcon className="h-4 w-4" />
        <span>Internships</span>
      </Link>
      <a href="/#resources" className={baseClass}>
        <BookOpen className="h-4 w-4" />
        <span>Resources</span>
      </a>
      <Link to="/chatbot" className={baseClass}>
        <Bot className="h-4 w-4" />
        <span>Chatbot</span>
      </Link>
      <Link to="/resume" className={baseClass}>
        <Clipboard className="h-4 w-4" />
        <span>Resume</span>
      </Link>
      {/* <Link to="/records" className={baseClass}>
        <Table className="h-4 w-4" />
        <span>Records</span>
      </Link> */}
      <Link to="/interview" className={`${baseClass} bg-yellow-500 text-black font-semibold rounded-full px-4 py-1 hover:bg-yellow-400`}>
        <Video className="h-4 w-4" />
        <span>Interview</span>
      </Link>
    </div>
  );
};

const UserMenu = ({ user, logout, mobile }: { user: any; logout: () => void; mobile?: boolean }) => {
  const baseClass = mobile
    ? "flex items-center space-x-2 hover:bg-purple-700 px-3 py-2 rounded-md w-full transition-all"
    : "flex items-center space-x-1 hover:text-yellow-200 transition-all";

  return (
    <div className={mobile ? "flex flex-col space-y-2" : "flex items-center space-x-4"}>
      <span className="text-sm font-medium">{user?.name}</span>
      <button onClick={logout} className={baseClass}>
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navigation;
