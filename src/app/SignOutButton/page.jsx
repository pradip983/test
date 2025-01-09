// components/SignOutButton.js

'use client'
import Footer from "@/components/Footer";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/api/signout", { method: "POST" });
    const data = await response.json();
    alert(data.message || data.error);
   
    const result = await signOut({ redirect: false });

    if(result){
      router.push("/")
    }
   
  };

  return (

    <>


      <div className="flex w-full h-[75vh]  items-center justify-center px-6 py-12 lg:px-8  ">
        <div className=" w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl ">
          <div className="sm:mx-auto sm:w-full  ">


            <h2 className="mt-10 text-center text-5xl font-bold tracking-tight text-gray-900">
              Sign out to your account
            </h2>
          </div>

          <div className="mt-14 sm:mx-auto sm:w-[50%]  ">

            <div className="my-5">


            </div>

            <div className="my-5">

              <div className="mt-2">

              </div>
            </div>

            <div className="mt-5">
              <button onClick={handleSignOut} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Out</button>

            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Register and Explore India ?

            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
