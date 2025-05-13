import React, { useState } from 'react';
import logo from "../images/logos/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        navigate("/login");
      }
      else {
        toast.error(data.msg);
      }
    })
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center min-h-screen px-4 py-6">
        <form onSubmit={submitForm} className='w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[25vw] max-w-md flex flex-col items-center bg-[#111827] p-5 sm:p-[20px] rounded-lg shadow-xl shadow-black/50'>
          <img className='w-[150px] sm:w-[180px] md:w-[230px] object-cover mb-4' src={logo} alt="Dev8 IDE Logo" />

          <div className="inputBox w-full mb-3">
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              id="fullName"
              onChange={(e) => { setFullName(e.target.value) }}
              value={fullName}
              type="text"
              placeholder='Full Name'
              className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div className="inputBox w-full mb-3">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              type="email"
              placeholder='Email'
              className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div className="inputBox w-full mb-4">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              onChange={(e) => { setPwd(e.target.value) }}
              value={pwd}
              type="password"
              placeholder='Password'
              className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <p className='text-gray-400 text-xs sm:text-sm md:text-[14px] mt-1 self-start'>
            Already have an account? <Link to="/login" className='text-blue-500 hover:text-blue-400 font-medium'>Login</Link>
          </p>

          <button className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUp