import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-400 text-center py-8 text-sm border-t border-gray-800">
      &copy; {new Date().getFullYear()} Dev8 by{' '}
      <a
        href="https://github.com/pradeepx-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        Pradeepx-dev
      </a>. All rights reserved.
    </footer>
  );
};

export default Footer;
