import React, { useState } from 'react';
import logo from "../images/logos/Dev82.png"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';
import { FiMail, FiLock, FiLogIn, FiArrowRight } from 'react-icons/fi';

const Login = () => {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        pwd: pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "/"
      }
      else {
        toast.error(data.msg);
      }
    })
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <img className='w-[180px] h-[120px] sm:w-[200px] sm:h-[130px] object-cover mx-auto' src={logo} alt="Dev8 IDE Logo" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">Sign in to continue coding</p>
          </div>

          {/* Form Card */}
          <form onSubmit={submitForm} className='w-full flex flex-col bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800/50'>
            <div className="space-y-4 mb-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="inputBox relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input 
                    id="email"
                    onChange={(e) => { setEmail(e.target.value) }} 
                    value={email} 
                    type="email" 
                    placeholder='Enter your email' 
                    className="w-full pl-12 pr-4"
                    required 
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="inputBox relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input 
                    id="password"
                    onChange={(e) => { setPwd(e.target.value) }} 
                    value={pwd} 
                    type="password" 
                    placeholder='Enter your password' 
                    className="w-full pl-12 pr-4"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 flex items-center justify-center gap-2 mb-4"
            >
              <FiLogIn className="text-lg" />
              <span>Sign In</span>
              <FiArrowRight className="text-lg" />
            </button>

            {/* Sign Up Link */}
            <p className='text-center text-gray-400 text-sm'>
              Don't have an account?{' '}
              <Link to="/signUp" className='text-blue-400 hover:text-blue-300 font-semibold hover:underline inline-flex items-center gap-1'>
                Sign Up
                <FiArrowRight className="text-xs" />
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login