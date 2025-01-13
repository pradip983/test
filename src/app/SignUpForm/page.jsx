'use client';


import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";


export default function SignUpForm() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

         const result = await signIn("credentials", {
              redirect: false,
              username: form.username,
              password: form.password,
            });
            
           if(result){
            router.push("/")
           }
        

        const data = await response.json();
        alert(data.message || data.error);
    };

    return (
        <>
        <div className="flex w-full h-[75vh]  items-center justify-center px-6 py-12 lg:px-8 ">
            <div  className=" w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl ">
                <div className="sm:mx-auto sm:w-full  ">

                    <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-[50%]  ">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div  className="my-3">
                            <label htmlFor="username" className="block text-base font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="my-3">
                            <label htmlFor="password" className="block text-base font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className="mt-5 text-center text-sm text-gray-500">
                    Register and Explore India ?
                    </p>
                </div>
            </div>
        </div>
        <Footer />
        </>

    );
} 