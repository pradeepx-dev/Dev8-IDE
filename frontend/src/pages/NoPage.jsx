import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NoPage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[calc(100vh-80px)] bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex flex-col justify-center items-center overflow-hidden text-white px-4">
        <div className="text-center">
          <h1 className="text-8xl sm:text-9xl font-extrabold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            404
          </h1>

          <p className="text-2xl sm:text-3xl font-bold mb-2 text-gray-200">
            Oops! Page not found
          </p>

          <p className="text-gray-400 mb-8 text-center max-w-md text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 font-semibold"
          >
            <FiArrowLeft className="text-lg" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    </>

  );
}
