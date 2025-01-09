// components/Navbar.js
'use client'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';



export default function Navbar() {

    const { data: session } = useSession();



    return (
        <nav className="fixed top-0 left-0 w-full bg-white z-50  ">
            <div className="max-w-screen-xl h-[15vh] flex items-center justify-between mx-auto p-4">
                {/* Logo */}
                <div className='border-4  p-6 rounded-md  border-gray-50' style={{boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4)"}}>
                    <Link href="/" className="text-4xl font-bold text-blue-700">
                        ExploreIND
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-16">
                    <Link href="/" className="text-black text-2xl font-sans  transform transition-transform duration-200 hover:scale-125 hover:text-blue-800 ">
                        Home
                    </Link>
                    <Link href="/services" className="text-black text-2xl font-sans transform transition-transform duration-200 hover:scale-125 hover:text-blue-800 ">
                        Services
                    </Link>
                    <Link href="/help" className="text-black text-2xl font-sans transform transition-transform duration-200 hover:scale-125 hover:text-blue-800 ">
                        Help
                    </Link>
                    <Link href="/about" className="text-black text-2xl font-sans transform transition-transform duration-200 hover:scale-125 hover:text-blue-800 ">
                        About
                    </Link>

                    <div className='border-4  p-3 rounded-md  border-gray-50 ' style={{ boxShadow: "0 35px 60px rgba(0, 0, 0, 0.4)" }}>
                        <div className='flex gap-3'>
                        <Link href={"/SignUpForm"}>
                            {!session && <button
                                className="bg-indigo-500 text-white px-[14px] py-2 rounded-md  hover:bg-indigo-600 transition"
                            >
                                Sign UP
                            </button>}
                        </Link>
                        <Link href={"/SignInForm"}>
                            {!session && <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"

                            >
                                Sign In
                            </button>}
                        </Link>
                        </div>
                        <Link href={"/SignOutButton"}>
                            {session && <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
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
