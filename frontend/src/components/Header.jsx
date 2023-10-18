import React, { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import logoImg from '../assets/CAMPUSCORE.png';

export const Header = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  // Function to handle the logout action
  const handleLogout = () => {
    // Implement your logout logic here
    alert('Logout clicked'); // You should replace this with your actual logout logic
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-12 w-auto" src={logoImg} alt="Campus Core logo" />
              <span className='hidden md:block absolute bottom-0 left-14 text-[8px] font-semibold'>A Secure Digital Repository as Knowledge Management System</span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="font-semibold text-slate-400 text-[12px]">Hi, user</span>
            <button
              type="button"
              className="relative rounded-md bg-white pt-2 mx-1 text-gray-400 hover:font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => setProfileOpen(!isProfileOpen)}
            >
              <AiOutlineCaretDown />
            </button>   

            {/* Profile dropdown */}
            <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={logoImg} alt="" />
            {isProfileOpen && (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                    onClick={() => setProfileOpen(!isProfileOpen)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    
                  </button>
                </div>
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1" id="profile-dropdown">
                  <div className="py-1" role="none">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
