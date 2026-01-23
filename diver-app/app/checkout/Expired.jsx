import React from 'react'

const Expired = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#205781] mb-4">
            Session Expired
          </h1>
          <p className="text-[#205781] mb-6">
            Would you like to start a new session?
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#205781] text-white rounded-lg"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
}

export default Expired