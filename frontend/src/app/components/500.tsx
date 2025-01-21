'use client';
import React from 'react';
import {redirect} from "next/navigation";

const InternalServerErrorPage: React.FC = () => {
  const goHome = () => {
    redirect('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-600">500</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Something went wrong
        </p>
        <p className="mt-2 text-gray-500">
          The server encountered an internal error. Please try again later.
        </p>
        <button
          onClick={goHome}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;
