'use client';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import React from 'react';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import Information from '@/components/Information';
import Location from '@/components/Location';
import Food from '@/components/Food';
import Review from '@/components/Review';
import NearPlave from '@/components/NearPlave';

export default function DestinationDetails({ params: paramsPromise }) {

  const { data: session } = useSession();

  const [cdestination, setCDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("information"); // Track the active section

  // Unwrap params using React.use()
  const params = React.use(paramsPromise);
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cdestination/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch destination data');
        }
        const data = await response.json();

        if (data) {
          setCDestination(data);
        } else {
          setError('Destination not found');
        }
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className=" bg-black text-gray-700 w-full h-screen font-serif flex items-center justify-center  text-7xl ">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  if (!cdestination) {
    return <p className="text-center text-xl text-red-500">Destination not found.</p>;
  }

  // Section Data Components
  const renderSectionContent = () => {
    switch (activeSection) {
      case "information":
        return <Information />;
      case "Foods":
        return <Food />;
      case "Near Place":
        return <NearPlave />;
      case "Location":
        return <Location />;
      case "Review":
        return <Review />;
      default:
        return <div>Welcome to the Destination Details page.</div>;
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#f5f5f5] flex justify-center items-center gap-2 text-black">
        <div className='left w-[24vw] h-full'>
          <div className="relative w-[95%] h-[90%] mx-auto mt-7 border-4 border-gray-50 rounded-lg shadow-2xl flex flex-col overflow-hidden select-none font-sans">
            <div className="w-full min-h-[80px] rounded-xl z-10 flex items-center justify-around gap-10 transition-all">
              <div>
                <a href="/" className="text-2xl font-semibold transition-opacity">
                  ExploreIND
                </a>
              </div>
              <div>
                <img src="/less.svg" alt="" className='w-[16px]' />
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex-1 w-full overflow-x-hidden transition-all rtl">
              {["information", "Foods", "Near Place", "Location", "Review"].map(
                (item, index) => (
                  <div
                    key={index}
                    className={`w-full h-[57px] flex items-center justify-center`}
                  >
                    <div
                      className={`relative flex items-center h-[40px] w-[85%] rounded-tl-3xl rounded-br-3xl p-3 border-[1px] border-[#364657] text-[#8392a5] cursor-pointer z-10 shadow-xl transform transition-transform duration-300 hover:scale-[1.05] ${
                        activeSection === item ? "text-[#dfe4ec] bg-[#5e6f80]" : ""
                      }`}
                      onClick={() => setActiveSection(item)} // Update active section
                    >
                      <img src="/beach.svg" alt="" className='opacity-[0.7]' />
                      <span className="ml-4">{item}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Nav Footer */}
            <div className="relative w-full h-[54px] flex flex-col z-10 transition-all mb-1">
              <div className="relative flex items-center w-[90%] mx-auto bg-[#364657] p-2 text-[#c2c7ce] rounded-lg h-[50px]">
                <div className="relative w-8 h-8 ml-4 overflow-hidden rounded-full transform transition-transform">
                  <Image
                    src={cdestination.image}
                    alt="Avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="relative ml-4 flex flex-col opacity-100 transition-opacity">
                  <a
                    href="https://codepen.io/uahnbu/pens/public"
                    target="_blank"
                    className="font-bold"
                  >
                    {session ? session.user.username : "User"}
                  </a>
                  <span className="text-xs text-[#8392a5]">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='right w-[74vw] h-full'>
          <div className='w-[98%] h-[92.4%] mx-auto mt-3 border-4 border-gray-50 rounded-lg shadow-2xl p-4'>
            {renderSectionContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
