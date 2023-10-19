// import React from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import logoImg from '../assets/CAMPUSCORE.png'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [userName, setUserName] = useState('Maria Ty');

    // Function to handle the logout action
    const handleLogout = () => {
        setProfileOpen(false); // Close the profile dropdown
        // Add logout logic here
    };

    function openMobileMenu() {
        setMobileMenu(!mobileMenu);
    }

    return (
        <nav className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button onClick={openMobileMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            {/* <!--
                            Icon when menu is closed.

                            Menu open: "hidden", Menu closed: "block"
          --> */}
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/* <!--
                            Icon when menu is open.

                            Menu open: "block", Menu closed: "hidden"
          --> */}
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-14 w-auto" src={logoImg} alt="Campus Core logo" />
                            <span className=' hidden md:block absolute bottom-0 left-14 text-[8px] font-semibold '>
                                A Secure Digital Repository as Knowledge Management System
                            </span>
                        </div>
                        {/* <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        {/* <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                                </div> */}
                        {/* </div> */}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button onClick={handleLogout} type="button" className="relative rounded-full bg-white p-1 text-gray-400 hover:bg-mainBlueColor hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <AiOutlineCaretDown />
                        </button>

                        {/* <!-- Profile dropdown --> */}
                        <div className="relative ml-3">
                        <div>
                            <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setProfileOpen(!isProfileOpen)}>
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={logoImg} alt={userName} />
                            </button>
                        </div>

                            {/* <!--
                            Dropdown menu, show/hide based on menu state.

                            Entering: "transition ease-out duration-100"
                            From: "transform opacity-0 scale-95"
                            To: "transform opacity-100 scale-100"
                            Leaving: "transition ease-in duration-75"
                            From: "transform opacity-100 scale-100"
                            To: "transform opacity-0 scale-95"
          --> */}
                            <div className=" hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                {/* <! Active: "bg-gray-100", Not Active: "" --> */}
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            {
                mobileMenu &&
                <div className={` relative transform transition-transform duration-300 ${mobileMenu ? 'scale-y-100' : 'scale-y-0'} origin-top-right z-50`} id="mobile-menu">
                    <div className=" absolute  w-full shadow-md space-y-1 px-2 pb-3 pt-2 bg-slate-700 ">
                        {/*  Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <Link to="/" onClick={openMobileMenu} className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
                        <Link to="/courses" onClick={openMobileMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Courses</Link>
                        <Link to="/files" onClick={openMobileMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Files</Link>
                        <Link to="/repository" onClick={openMobileMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Repository</Link>
                    </div>
                </div>
            }

                {isProfileOpen && (
                    <div className="absolute top-0 right-0 border mr-20 bg-slate-700 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none inset-50" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1" id="profile-dropdown">
                        <div className="py-1" role="none">
                            <div className="block px-4 py-2 text-sm text-white">
                                <span className="mr-2">{userName}</span>
                                <img className="h-6 w-6 rounded-full inline-block" src={logoImg} alt={userName} />
                            </div>
                            <button className="block px-4 py-2 text-sm text-white" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
        </nav>



    )
}