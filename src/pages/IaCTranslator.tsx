
import React from 'react';
import NavBar from '../components/layout/NavBar';

const IaCTranslator = () => {
  return (
    <div className="min-h-screen theme-gradient flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="container max-w-5xl mx-auto page-transition">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
            IaC Translator
          </h1>
          
          <div className="glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-medium text-theme-dark mb-6">
              Infrastructure as Code Translation
            </h2>
            <p className="text-theme-dark/80 mb-8">
              Easily translate between different Infrastructure as Code formats like Terraform, CloudFormation, Pulumi, and more. This feature is coming soon.
            </p>
            
            <div className="bg-theme-dark/10 rounded-lg p-8 mb-8">
              <p className="text-theme-dark font-medium">Coming Soon</p>
            </div>
            
            <button 
              disabled
              className="px-6 py-3 bg-theme-dark text-white rounded-lg opacity-70 cursor-not-allowed"
            >
              Try IaC Translator
            </button>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>&copy; {new Date().getFullYear()} DevOpsTile. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IaCTranslator;
