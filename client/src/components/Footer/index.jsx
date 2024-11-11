import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Locus Branding */}
          <p className="text-lg font-semibold">Locus</p>

          {/* Copyright Notice */}
          <p className="text-sm mt-2">
            &copy; 2024 Locus. All rights reserved.
          </p>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/HashemE1999/locus.git"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-blue-400 hover:text-blue-600 transition duration-300"
          >
            Visit our repository!
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
