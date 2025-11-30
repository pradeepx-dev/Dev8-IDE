import React from 'react'
import Navbar from '../components/Navbar';
import { FiCode, FiZap, FiUsers, FiHeart, FiGithub, FiLinkedin, FiMail, FiMessageCircle } from 'react-icons/fi';

export default function About() {
  return (
    <div className="bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white min-h-screen font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center border-b border-gray-800/50 pb-8 sm:pb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
          About Dev8 IDE
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-2 leading-relaxed">
          A fast, free, and clean online IDE for developers. Built for speed, simplicity, and accessibility by{' '}
          <a href="https://github.com/pradeepx-dev" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
            Pradeepx-dev
          </a>.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-6 sm:space-y-8 pb-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Section 1 */}
          <div className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800/50 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <FiCode className="text-blue-400 text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Dev8 IDE?</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Dev8 IDE is crafted to give developers a no-setup, browser-based coding experience with support for multiple languages. Whether you're learning, testing snippets, or building small apps, Dev8 IDE offers a smooth and distraction-free interface.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800/50 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <FiZap className="text-purple-400 text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Free for Everyone</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3">
              Dev8 IDE is free and open to everyone. However, to make the most of your experience—like saving your work, accessing past projects, and managing code across devices—you'll need to sign up or log in.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Signing up is quick and easy. Once you're in, you can create, edit, and save unlimited projects securely in your account.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800/50 hover:border-pink-500/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-pink-500/20 border border-pink-500/30">
              <FiUsers className="text-pink-400 text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">About the Creator</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Created and maintained by{' '}
            <a className="text-blue-400 hover:text-blue-300 font-semibold hover:underline" href="https://github.com/pradeepx-dev" target="_blank" rel="noreferrer">
              Pradeepx-dev
            </a>, a developer passionate about building simple tools that empower others to code. This project reflects a love for clean design and practical utility.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800/50 hover:border-green-500/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
              <FiMessageCircle className="text-green-400 text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Have Suggestions?</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
            Your feedback is welcome! If you have suggestions, feature ideas, or want to contribute, feel free to reach out. Every suggestion helps shape the future of Dev8 IDE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/pradeepx-dev"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40"
            >
              <FiGithub className="text-lg" />
              <span>Contribute on GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/pradeepx"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40"
            >
              <FiLinkedin className="text-lg" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}