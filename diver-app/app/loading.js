'use client';

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-[#205781] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#205781]">Loading...</h2>
          <p className="text-slate-500 text-sm mt-1">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
