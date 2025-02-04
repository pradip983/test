// components/Navbar.js
'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [hoveredLink, setHoveredLink] = useState(null);

    const links = [
        { href: "/", text: "Home", popup: "Go to the homepage" },
        { href: "/Location", text: "Location", popup: "Add your Location and Detail" },
        { href: "/ServicePage", text: "Services", popup: "Explore our services" },
        { href: "/AboutPage", text: "About", popup: "Learn more about us" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
            <div className="max-w-screen-xl h-[12vh] flex items-center justify-between mx-auto px-6">
                {/* Logo */}
                <div
                    className="border-2 p-3 rounded-md border-gray-50"
                    style={{ boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)" }}
                >
                    <Link href="/" className="text-2xl font-bold text-blue-700">
                        ExploreIND
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8 relative">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="relative group"
                            onMouseEnter={() => setHoveredLink(index)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <Link
                                href={link.href}
                                className="text-black block text-lg font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800"
                            >
                                {link.text}
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
                                            className="bg-indigo-500 text-white text-xs px-4 py-1.5 rounded-md hover:bg-indigo-600 transition"
                                        >
                                            Sign Up
                                        </button>
                                    </Link>
                                    <Link href="/SignInForm">
                                        <button
                                            className="bg-indigo-500 text-white text-xs px-4 py-1.5 rounded-md hover:bg-indigo-600 transition"
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
                                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
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
            </div>
        </nav>
    );
}
