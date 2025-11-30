import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="glass-effect text-gray-400 text-center py-6 sm:py-8 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm">
            <span>&copy; {new Date().getFullYear()} Dev8 IDE</span>
            <span className="text-gray-600">•</span>
            <span>Made with</span>
            <FiHeart className="text-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/pradeepx-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Pradeepx-dev
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/pradeepx-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-blue-500/50"
              aria-label="GitHub"
            >
              <FiGithub className="text-lg" />
            </a>
            <a
              href="https://linkedin.com/in/pradeepx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-blue-500/50"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:pradeepx135@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-blue-500/50"
              aria-label="Email"
            >
              <FiMail className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
