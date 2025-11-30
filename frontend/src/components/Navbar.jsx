import React, { useState } from 'react';
import logo from "../images/logos/Dev82.png";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiInfo, FiLogOut, FiCode } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login"); 
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="glass-effect h-[80px] w-full px-4 md:px-8 lg:px-12 flex items-center justify-between relative z-50 border-b border-gray-800/50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img src={logo} className="w-[120px] h-[130px] object-contain transition-transform group-hover:scale-105" alt="Dev8 Logo" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link 
            to='/' 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isActive('/') 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link 
            to='/about' 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isActive('/about') 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <FiInfo className="text-lg" />
            <span>About</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all shadow-lg shadow-red-500/30 hover:shadow-red-600/40"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>

        {/* Hamburger icon for mobile */}
        <button 
          className="md:hidden text-gray-300 hover:text-white text-2xl z-50 p-2 rounded-lg hover:bg-dark-800 transition-all" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-[80px] left-0 w-full glass-effect flex flex-col items-center gap-2 py-4 text-white font-medium transition-all duration-300 md:hidden border-b border-gray-800/50 ${
            menuOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-6 pointer-events-none'
          }`}
        >
          <Link 
            to='/' 
            onClick={() => setMenuOpen(false)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg w-[90%] transition-all ${
              isActive('/') 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link 
            to='/about' 
            onClick={() => setMenuOpen(false)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg w-[90%] transition-all ${
              isActive('/about') 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-dark-800'
            }`}
          >
            <FiInfo className="text-lg" />
            <span>About</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg w-[90%] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
