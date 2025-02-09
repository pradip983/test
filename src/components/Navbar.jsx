// components/Navbar.js
'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [hoveredLink, setHoveredLink] = useState(null);

    const links = [
        { href: "/", text: "Home", popup: "Go to the homepage", image: "/home.svg" },
        { href: "/ProfilePage", text: "Booking", popup: " your Booking  Details and ticket", image: "/booking1.svg" },
        { href: "/ServicePage", text: "Services", popup: "Explore our services", image: "/services.svg" },
        { href: "/AboutPage", text: "About", popup: "Learn more about us", image: "/about.svg" },
    ];

    return (
        <nav className="  fixed top-0 left-0 w-full px-4 lg:px-0 lg:w-full  bg-white z-50 shadow-md">
            <div className="lg:max-w-screen-xl   h-[9vh] lg:h-[12vh] flex items-center justify-between mx-auto lg:px-4 px-2">
                {/* Logo */}
                <div
                    className="border-2 p-3  rounded-md border-gray-50"
                    style={{ boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)" }}
                >
                    <Link href="/" className="lg:text-2xl text-xs lg:font-bold font-semibold text-blue-700">
                        ExploreIND
                    </Link>
                </div>
              
               {/* Navigation Links */}
             <div className="  hidden lg:flex  items-center    gap-8   ">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="relative group"
                            onMouseEnter={() => setHoveredLink(index)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link
                                href={link.href}
                                className="text-black  lg:text-lg text-sm inline-flex lg:gap-2  gap-1 font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800"
                            >
                                <img src={link.image} className="lg:w-full w-4 opacity-[0.7]" alt="" /> <span>{link.text}</span>
                            </Link>
                            {/* Popup */}
                            {hoveredLink === index && (
                                <div className=" inline-block  absolute top-16  bg-white text-black text-sm rounded-md shadow-lg p-3   z-10 w-48">
                                    {link.popup}
                                </div>
                            )}
                        </div>
                    ))}

                     {/* Auth Buttons */}
                <div
                    className="border-2 p-2 rounded-md border-gray-50"
                    style={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)" }}
                >
                    <div className="flex gap-2">
                        {!session && (
                            <>
                                <Link href="/SignUpForm">
                                    <button
                                        className="bg-indigo-500 text-white text-xs  lg:px-4 px-2 lg:py-1.5 py-1 rounded-md hover:bg-indigo-600 transition"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                                <Link href="/SignInForm">
                                    <button
                                        className="bg-indigo-500 text-white text-xs lg:px-4 px-2 lg:py-1.5 py-1 rounded-md hover:bg-indigo-600 transition"
                                    >
                                        Sign In
                                    </button>
                                </Link>

                            </>
                        )}
                        {session && (
                            <>
                                <Link href="/ProfilePage">

                                    <div className="flex items-center gap-3  px-4  rounded-md     transition cursor-pointer">
                                        {/* Profile Image */}
                                        <img
                                            src={session?.user?.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                                        />

                                        {/* User Info */}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-normal text-gray-800">{session?.user?.username}</span>
                                            <span className="text-xs text-gray-500">{session?.user?.location}</span>
                                        </div>
                                    </div>

                                </Link>
                            </>
                        )}
                    </div>
                </div>

                </div>
                    {/* Auth Buttons */}
                    <div
                    className=" lg:hidden visible  border-2  p-2 rounded-md border-gray-50"
                    style={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)" }}
                >
                    <div className="flex gap-2">
                        {!session && (
                            <>
                                <Link href="/SignUpForm">
                                    <button
                                        className="bg-indigo-500 text-white text-xs  lg:px-4 px-2 lg:py-1.5 py-1 rounded-md hover:bg-indigo-600 transition"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                                <Link href="/SignInForm">
                                    <button
                                        className="bg-indigo-500 text-white text-xs lg:px-4 px-2 lg:py-1.5 py-1 rounded-md hover:bg-indigo-600 transition"
                                    >
                                        Sign In
                                    </button>
                                </Link>

                            </>
                        )}
                        {session && (
                            <>
                                <Link href="/ProfilePage">

                                    <div className="flex items-center gap-3  px-4  rounded-md     transition cursor-pointer">
                                        {/* Profile Image */}
                                        <img
                                            src={session?.user?.image}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                                        />

                                        {/* User Info */}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-normal text-gray-800">{session?.user?.username}</span>
                                            <span className="text-xs text-gray-500">{session?.user?.location}</span>
                                        </div>
                                    </div>

                                </Link>
                            </>
                        )}
                    </div>
                </div>
               
               


            </div>
             {/* Navigation Links */}
             <div className=" lg:hidden visible  flex items-center  justify-center px-8 lg:px-0 gap-8   ">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="relative group"
                            onMouseEnter={() => setHoveredLink(index)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link
                                href={link.href}
                                className="text-black  lg:text-lg text-sm inline-flex lg:gap-2  gap-1 font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800"
                            >
                                <img src={link.image} className="lg:w-full w-4 opacity-[0.7]" alt="" /> <span>{link.text}</span>
                            </Link>
                            {/* Popup */}
                            {hoveredLink === index && (
                                <div className=" inline-block  absolute top-16  bg-white text-black text-sm rounded-md shadow-lg p-3   z-10 w-48">
                                    {link.popup}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
        </nav>
    );
}
