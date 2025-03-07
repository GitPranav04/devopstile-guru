
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-theme-dark/80 backdrop-blur-md border-b border-white/10 animate-fade-in">
      <div className="flex items-center">
        <Link to="/" className="text-white font-medium text-xl transition-all hover:opacity-80">
          CloudMorph
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`text-white hover:text-white/80 transition-all ${location.pathname === '/' ? 'text-white font-medium' : 'text-white/90'}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/devops-assistant" 
              className={`text-white hover:text-white/80 transition-all ${location.pathname === '/devops-assistant' ? 'text-white font-medium' : 'text-white/90'}`}
            >
              DevOps Assistant
            </Link>
          </li>
          <li>
            <Link 
              to="/iac-translator" 
              className={`text-white hover:text-white/80 transition-all ${location.pathname === '/iac-translator' ? 'text-white font-medium' : 'text-white/90'}`}
            >
              IaC Translator
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
