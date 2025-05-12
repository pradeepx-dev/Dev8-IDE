import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Oops! Page not found</p>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
