// import React from 'react'
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import logoImg from "../../assets/CAMPUSCORE.png";
import Route from "./Route";
export const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userName, setUserName] = useState("Maria Ty");

  // Function to handle the logout action
  const handleLogout = () => {
    setProfileOpen(!isProfileOpen); // Close the profile dropdown
    // Add logout logic here
  };

  function openMobileMenu() {
    setMobileMenu(!mobileMenu);
  }

  return (
    <nav className="sticky top-0 bg-white shadow-xl pb-2 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="md:hidden absolute inset-y-0 left-0 flex items-center ">
            {/* <!-- Mobile menu button--> */}
            <button
              onClick={openMobileMenu}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {mobileMenu ? <MdOutlineClose /> : <GiHamburgerMenu color="gray"/>}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center md:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-14 w-auto"
                src={logoImg}
                alt="Campus Core logo"
              />
              <span className=" hidden md:block absolute bottom-0 left-16 text-[8px] font-semibold ">
                A Secure Digital Repository as Knowledge Management System
              </span>
            </div>
          </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <span className="text-[12px] tracking-wide mr-2">Hi, User</span> */}
            {/* <button
              onClick={handleLogout}
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-400 hover:bg-mainBlueColor hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <AiOutlineCaretDown />
            </button> */}

            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setProfileOpen(!isProfileOpen)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={logoImg}
                    alt={userName}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {mobileMenu && (
        <div
          className="fixed w-full h-screen flex flex-col justify-center items-center
                    bg-white/90 z-20
                "
        >
          <Route user_type="admin"/>
        </div>
      )}

      {isProfileOpen && (
        <div
          onClick={handleLogout}
          className=" absolute top-0 right-0 border mr-20 bg-slate-700 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none inset-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
          id="profile-dropdown"
        >
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
