// components/Navbar.js
'use client'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {

    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white z-50">
            <div className="max-w-screen-xl h-[12vh] flex items-center justify-around mx-auto p-3">
                {/* Logo */}
                <div className='border-2 p-3 rounded-md border-gray-50' style={{boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)"}}>
                    <Link href="/" className="text-2xl font-bold text-blue-700">
                        ExploreIND
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-12">
                    <Link href="/" className="text-black text-lg font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800">
                        Home
                    </Link>
                    <Link href="/services" className="text-black text-lg font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800">
                        Services
                    </Link>
                    <Link href="/help" className="text-black text-lg font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800">
                        Help
                    </Link>
                    <Link href="/about" className="text-black text-lg font-sans transform transition-transform duration-200 hover:scale-110 hover:text-blue-800">
                        About
                    </Link>

                    <div className='border-2 p-2 rounded-md border-gray-50' style={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)" }}>
                        <div className='flex gap-2'>
                            <Link href={"/SignUpForm"}>
                                {!session && <button
                                    className="bg-indigo-500 text-white text-xs px-4 py-1.5 rounded-md hover:bg-indigo-600 transition"
                                >
                                    Sign UP
                                </button>}
                            </Link>
                            <Link href={"/SignInForm"}>
                                {!session && <button
                                    className="bg-indigo-500 text-white text-xs px-4 py-1.5 rounded-md hover:bg-indigo-600 transition"
                                >
                                    Sign In
                                </button>}
                            </Link>
                        </div>
                        <Link href={"/SignOutButton"}>
                            {session && <button
                                className="bg-indigo-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-indigo-600 transition"
                            >
                                Sign Out
                            </button>}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
