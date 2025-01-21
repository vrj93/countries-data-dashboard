'use client';
import React from 'react';
import {redirect} from "next/navigation";

const NotFoundPage: React.FC = () => {
  const goHome = () => {
    redirect('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page not found
        </p>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goHome}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
