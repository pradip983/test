"use client";
import Navbar from "@/components/Navbar";
import Front from "@/components/Front";
import Card from "@/components/Card";
import TradingDestination from "@/components/TradingDestination";
import ChooseDestination from "@/components/ChooseDestination";
import Footer from "@/components/Footer";
import Reviewweb from "@/components/Reviewweb";
import TopSearches from "@/components/TopSearches";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch Lottie animation JSON from public folder
    fetch("/loadingp.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));

    // Set a timer for loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-[100vh] w-[100vw] bg-[#f8f9fa] flex items-center justify-center">
          {animationData && <Lottie animationData={animationData} loop className="h-[25vh]" />}
        </div>
      ) : (
        <>
          <Navbar />
          <Front />
          <Card />
          <TopSearches />
          <TradingDestination />
          <ChooseDestination />
          <Reviewweb />
          <Footer />
        </>
      )}
    </>
  );
}
