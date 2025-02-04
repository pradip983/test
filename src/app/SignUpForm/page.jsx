'use client';

import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpForm() {
    const [form, setForm] = useState({ username: "", password: "", location: "", bio: "", email: "", image: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send sign-up request
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "An error occurred during sign-up. Please try again.");
                setLoading(false);
                return;
            }

            toast.success(data.message || "Sign-up successful!");

            // Automatically sign the user in after successful sign-up
            const result = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (result?.error) {
                toast.error(result.error || "Sign-in failed. Please log in manually.");
            } else {
                toast.success("Welcome! Redirecting you to the homepage.");
                router.push("/");
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
                <div className="w-[45vw] h-[70vh] border-4 border-gray-50 rounded-lg shadow-2xl">
                    <div className="sm:mx-auto sm:w-full">
                        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-[50%]  ">
                        <form onSubmit={handleSubmit} className="">
                            <div className="overflow-y-auto hide-scrollbar h-[40vh] w-full space-y-6 p-2  ">
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

                                <div className="my-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-base font-medium text-gray-900"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm({ ...form, email: e.target.value })
                                            }
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

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

                                <div className="my-3">
                                    <label
                                        htmlFor="image"
                                        className="block text-base font-medium text-gray-900"
                                    >
                                        Image
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="image"
                                            name="image"
                                            type="text"
                                            value={form.image}
                                            onChange={(e) =>
                                                setForm({ ...form, image: e.target.value })
                                            }
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Enter your profile image URL"
                                        />
                                    </div>
                                </div>

                                <div className="my-3">
                                    <label
                                        htmlFor="location"
                                        className="block text-base font-medium text-gray-900"
                                    >
                                        Location
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="location"
                                            name="location"
                                            type="text"
                                            value={form.location}
                                            onChange={(e) =>
                                                setForm({ ...form, location: e.target.value })
                                            }
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Enter your location(district) "
                                        />
                                    </div>
                                </div>

                                <div className="my-3">
                                    <label
                                        htmlFor="bio"
                                        className="block text-base font-medium text-gray-900"
                                    >
                                        Bio
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="bio"
                                            name="bio"
                                            type="text"
                                            value={form.bio}
                                            onChange={(e) =>
                                                setForm({ ...form, bio: e.target.value })
                                            }
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Enter your bio"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                                        }`}
                                >
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                        <p className="mt-5 text-center text-sm text-gray-500">
                            Register and Explore India!
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
