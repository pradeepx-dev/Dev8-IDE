import React from 'react'
import logo from "../images/logos/Dev8 (1).png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className="nav flex px-[100px] items-center justify-between h-[90px] bg-[#111827] font-medium">
        <img src={logo} className='w-[170px] h-[80px] object-cover' alt="" />

        <div className="links flex items-center gap-[15px]">
          <Link to='/' className=' transition-all hover:text-blue-500'>Home</Link>
          <Link to='/about' className=' transition-all hover:text-blue-500'>About</Link>
          <button onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }} className="btnNormal bg-red-500 transition-all hover:bg-red-600 px-[20px]">Logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar