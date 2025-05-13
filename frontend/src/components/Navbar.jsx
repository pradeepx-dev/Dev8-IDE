import React, { useState } from 'react';
import logo from "../images/logos/Dev82.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Install with: npm install react-icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login"); 
  };

  return (
    <>
      <nav className="bg-[#111827] h-[90px] w-full px-4 md:px-[50px] lg:px-[100px] flex items-center justify-between relative z-50 ">
        {/* Logo */}
        <img src={logo} className="w-[140px] h-[150px] object-contain" alt="Dev8 Logo" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link to='/' className="hover:text-blue-500 transition-all">Home</Link>
          <Link to='/about' className="hover:text-blue-500 transition-all">About</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-all text-white"
          >
            Logout
          </button>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden text-white text-2xl z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-[90px] left-0 w-full bg-[#111827] flex flex-col items-center gap-6 py-6 text-white font-medium transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
            }`}
        >
          <Link to='/' onClick={() => setMenuOpen(false)} className="hover:text-blue-500">Home</Link>
          <Link to='/about' onClick={() => setMenuOpen(false)} className="hover:text-blue-500">About</Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-all text-white"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
