'use client';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut, signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const { data: session } = useSession();
    const Router = useRouter();
    const [visible, setVisible] = useState("");
    const [form, setForm] = useState({ username: "", location: "", bio: "", image: "", email: session?.user?.email, password: "" });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();


    useEffect(() => {

        if (session?.user?.id) {

            const booking = async () => {
                const response = await fetch("/api/FetchBookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: session?.user?.id }),
                });
                const data = await response.json();
                setData(data)

            }

            booking();
        }


    }, [])


    const handleSubmit = async (e) => {


        e.preventDefault();
        setLoading(true);

        try {

            const response = await fetch("/api/ProfileUpdate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, email: session?.user?.email }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "An error occurred during sign-up. Please try again.", { autoClose: 2000 });
                setLoading(false);
                return;
            }


            if (response.ok) {
                toast.success(data.message || "Profile updated successfully!", { autoClose: 2000 });


                const result = await signIn("credentials", {
                    redirect: false,
                    email: form.email,
                    password: form.password,
                });

                setVisible("")

                if (result?.error) {
                    toast.error(result.error || "Failed to update profile.", { autoClose: 2000 });
                }
            }



        } catch (error) {

            toast.error("An unexpected error occurred. Please try again.", { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    const handlehome = () => {
        setLoading(true);
        Router.push("/")
    };





    return (
        <>
            {session ? (
                <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center">
                    <ToastContainer />
                    {/* Cover Image */}
                    <div className="relative w-full h-[55vh] ">
                        <img src='/travel.jpg' className="w-full h-full object-cover shadow-2xl " alt="Cover" />

                        {/* Profile Info */}
                        <div className="absolute flex gap-4 bottom-[-40px] left-[100px]">
                            <img src={session?.user?.image} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md" alt="Profile" />
                            <div className="mt-6">
                                <h2 className="text-xl font-bold text-gray-200">@{session?.user?.username}</h2>
                                <Link href="/SignOutButton">
                                    <div className="text-sm mt-2 flex items-center gap-1 justify-center ml-1 text-sky-900 hover:scale-110 hover:cursor-pointer hover:text-blue-700 transition"><div> Sign Out -</div><div className='mt-[3px]'>&gt;</div></div></Link>
                            </div>
                        </div>
                    </div>

                    {/* User Info Section */}
                    <div className="w-1/2 text-center rounded-2xl border-gray-50 shadow-2xl border-2 p-5 mt-14">
                        <p className="text-gray-600">{session?.user?.location} | {session?.user?.email}</p>
                        <p className="text-sm mt-3 text-gray-600">{session?.user?.bio}</p>
                        <button onClick={() => setVisible("profile")} className="bg-white border mt-7 mx-2 border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition">
                            Edite Profile
                        </button>
                        <button onClick={() => setVisible("booking")} className="bg-white border mt-7 mx-2 border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition">
                            Your Booking
                        </button>

                    </div>



                    {/* Posts Section */}
                    <div className={`w-full h-[65vh] mb-5 ${visible === 'booking' ? "block" : "hidden"}`}>
                        <div className="w-[70%] h-[60vh] m-auto p-5">
                            <h1 className="text-black text-2xl font-bold">Your Booking</h1>
                            <h2 className="text-black text-lg font-sans">Your Recent Booking Details</h2>
                            <div className="border-2 m-2 border-gray-50  w-full h-[50vh] rounded-2xl overflow-y-auto hide-scrollbar  ">

                                {data?.length > 0 ? (
                                    data.map((booking) => (
                                        <div key={booking._id} className="border-2 rounded-lg hover:scale-95 transition w-[75%] h-[20vh] m-4 mx-auto flex flex-col justify-center p-4 bg-[#f8f9fa] shadow-2xl">
                                            <h1 className="text-2xl ml-7 font-semibold text-gray-500 mb-2">{booking.name}</h1>
                                            <div className="w-full flex justify-between px-8 text-lg">
                                                <div className="text-left">
                                                    <p className="text-gray-400 font-normal text-base">Id: {booking.id}</p>
                                                    <p className="text-gray-400 font-normal text-base">Date: {new Date(booking.date).toDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-gray-400 font-normal text-base">Price: ₹{booking.price / 100}</p>
                                                    <p className="text-gray-400 font-normal text-base">Place: {booking.place}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No bookings found.</p>
                                )}

                            </div>
                        </div>
                    </div>


                    {/* Profile Edite */}
                    <div className={`w-full h-[65vh] mb-5 ${visible === 'profile' ? "block" : "hidden"}`}>
                        <div className="w-[70%] h-[60vh] m-auto p-5">
                            <h1 className="text-black text-2xl font-bold"> Profile Edite</h1>
                            <h2 className="text-black text-lg font-sans">Edite Your Profile for Better Visualization</h2>
                            <div className='border-2 m-2 border-gray-50 shadow-2xl w-full h-[50vh] rounded-2xl flex items-center justify-center'>
                                <form onSubmit={handleSubmit} className="space-y-6 w-[50%] ">
                                    <div className="flex  items-center justify-between  w-full ">
                                        <div>
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

                                        </div>
                                        <div>

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

                                    </div>
                                    <div className="">
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
                                                placeholder="Enter your current password"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                                                }`}
                                        >
                                            {loading ? "Changing..." : "Change"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            ) : (
                <div className="flex w-full h-[75vh] items-center justify-center px-6 py-12 lg:px-8">
                    <div className="w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl">
                        <div className="sm:mx-auto sm:w-full">
                            <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Sign in of your account
                            </h2>
                        </div>

                        <div className="mt-14 sm:mx-auto sm:w-[50%]">
                            <div className="mt-5">
                                <button
                                    onClick={handlehome}
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                                        }`}
                                >
                                    {loading ? "Redirect" : "Home"}
                                </button>
                            </div>

                            <p className="mt-5 text-center text-sm text-gray-500">
                                Register and Explore India?
                            </p>
                        </div>
                    </div>
                </div>

            )}

            <Footer />
        </>
    );
}
