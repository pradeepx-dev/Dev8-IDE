import React from 'react'
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="bg-[#1F2937] text-white min-h-screen font-sans">
      <Navbar />
      {/* Hero Section - Responsive improvements */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 text-center border-b border-gray-800 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-300 mb-2 sm:mb-4">About Dev8 IDE</h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
          A fast, free, and clean online IDE for developers. Built for speed, simplicity, and accessibility by <a href="https://github.com/pradeepx-dev" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">Pradeepx-dev</a>.
        </p>
      </section>

      {/* Main Content Section - Improved responsive layout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-4 sm:space-y-5 pb-8">
        {/* Grid layout that stacks on mobile and shows side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
          {/* Section 1 */}
          <div className="bg-gray-900 p-5 sm:p-8 rounded-lg shadow-md border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Why Dev8 IDE?</h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Dev8 IDE is crafted to give developers a no-setup, browser-based coding experience with support for multiple languages. Whether you're learning, testing snippets, or building small apps, Dev8 IDE offers a smooth and distraction-free interface.
            </p>
          </div>

          {/* Section 2 - Updated */}
          <div className="bg-gray-900 p-5 sm:p-8 rounded-lg shadow-md border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Free for Everyone</h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
              Dev8 IDE is free and open to everyone. However, to make the most of your experience—like saving your work, accessing past projects, and managing code across devices—you'll need to sign up or log in.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Signing up is quick and easy. Once you're in, you can create, edit, and save unlimited projects securely in your account.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-gray-900 p-5 sm:p-8 rounded-lg shadow-md border border-gray-800">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">About the Creator</h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Created and maintained by <a className="text-blue-400 underline hover:text-blue-300" href="https://github.com/pradeepx-dev" target="_blank" rel="noreferrer">Pradeepx-dev</a>, a developer passionate about building simple tools that empower others to code. This project reflects a love for clean design and practical utility.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-gray-900 p-5 sm:p-8 rounded-lg shadow-md border border-gray-800 mb-6 sm:mb-9">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Have Suggestions?</h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
            Your feedback is welcome! If you have suggestions, feature ideas, or want to contribute, feel free to reach out on GitHub. Every suggestion helps shape the future of Dev8 IDE.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <a
              href="https://github.com/pradeepx-dev"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-white font-medium transition duration-200 text-center sm:text-left"
            >
              Contribute on GitHub
            </a>
            <a
              href="https://linkedin.com/in/pradeepx"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 sm:ml-6 rounded-md text-white font-medium transition duration-200 text-center sm:text-left"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}