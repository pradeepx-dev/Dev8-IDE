import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NoPage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[calc(100vh-90px)] bg-gray-900 flex flex-col justify-center items-center overflow-hidden text-white px-4">
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 text-red-500">404</h1>

        <p className="text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Oops! Page not found
        </p>

        <p className="text-gray-400 mb-6 text-center max-w-md">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-300"
        >
          ⬅ Go Back Home
        </Link>
      </div>
    </>

  );
}
