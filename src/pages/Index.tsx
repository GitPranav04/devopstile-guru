
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/layout/NavBar';

const Index = () => {
  return (
    <div className="min-h-screen theme-gradient flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="container max-w-5xl mx-auto page-transition">
          <h1 className="text-4xl md:text-5xl font-light text-white text-center mb-16 tracking-tight">
            Welcome to <span className="font-medium">DevOpsTile</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/devops-assistant" className="tile-hover">
              <div className="glass-card rounded-2xl p-8 aspect-square flex items-center justify-center cursor-pointer">
                <h2 className="text-2xl md:text-3xl font-medium text-theme-dark text-center transition-all">
                  DevOps Assistant
                </h2>
              </div>
            </Link>
            
            <Link to="/iac-translator" className="tile-hover">
              <div className="glass-card rounded-2xl p-8 aspect-square flex items-center justify-center cursor-pointer">
                <h2 className="text-2xl md:text-3xl font-medium text-theme-dark text-center transition-all">
                  IaC Translator
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>&copy; {new Date().getFullYear()} DevOpsTile. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
