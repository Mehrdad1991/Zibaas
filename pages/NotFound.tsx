
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-black text-pink-600 mb-4 tracking-tighter italic">404</h1>
      <h2 className="text-3xl font-black text-gray-900 mb-8">صفحه مورد نظر پیدا نشد!</h2>
      <Link to="/" className="bg-pink-600 text-white px-10 py-4 rounded-3xl font-black shadow-2xl hover:bg-pink-700 transition-all">
        بازگشت به خانه
      </Link>
    </div>
  );
};

export default NotFound;
