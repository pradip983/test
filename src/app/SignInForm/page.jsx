'use client';

import React, { useState } from "react";
import Footer from "@/components/Footer";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pass credentials to `signIn`
      const result = await signIn("credentials", {
        redirect: false,
        username: form.username,
        password: form.password,
      });

      if (result?.error) {
        alert(result.error); // Display error message
      } else {
        alert("Sign-in successful!"); // Display success message
        router.push('/'); // Redirect to homepage
      }
    } catch (error) {
      
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full h-[75vh] items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-[50%]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="my-3">
                <label
                  htmlFor="username"
                  className="block text-base font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="my-3">
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                  }`}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
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
