'use client';

import Footer from "@/components/Footer";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      // Optional API call to handle server-side cleanup if needed
      const response = await fetch("/api/signout", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Error during sign out. Please try again.");
      } 
      // Sign out using NextAuth
      const result = await signOut({ redirect: false });

      if (result) {
        toast.success(data.message || "Successfully signed out!", {onClose: router.push("/")});
      }
    } catch (error) {
     
      toast.warn("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full h-[75vh] items-center justify-center px-6 py-12 lg:px-8">
        <ToastContainer />
        <div className="w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign out of your account
            </h2>
          </div>

          <div className="mt-14 sm:mx-auto sm:w-[50%]">
            <div className="mt-5">
              <button
                onClick={handleSignOut}
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                {loading ? "Signing Out..." : "Sign Out"}
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-gray-500">
              Register and Explore India?
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
