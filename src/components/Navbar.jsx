// components/Navbar.js
import Link from 'next/link';



export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50  ">
            <div className="max-w-screen-xl h-[15vh] flex items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="text-4xl font-bold text-white">
                    ExploreIND
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="text-white text-2xl hover:text-indigo-600 transition">
                        Home
                    </Link>
                    <Link href="/services" className="text-white text-2xl hover:text-indigo-600 transition">
                        Services
                    </Link>
                    <Link href="/help" className="text-white text-2xl hover:text-indigo-600 transition">
                        Help
                    </Link>
                    <Link href="/about" className="text-white text-2xl hover:text-indigo-600 transition">
                        About
                    </Link>
                    <Link href={"/SignUpForm"}>
                    <button
                        className="bg-indigo-500 text-white px-[14px] py-2 rounded-md  hover:bg-indigo-600 transition"
                    >
                        Sign UP
                    </button>
                    </Link>
                    <Link href={"/SignInForm"}>
                    <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            >
              Sign In
            </button>
            </Link>
            <Link href={"/SignOutButton"}>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            >
              Sign Out
            </button>
            </Link>

                </div>
            </div>
        </nav>
    );
}
