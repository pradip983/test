import Image from "next/image";
import Navbar from "@/components/Navbar";
import Front from "@/components/Front";
import Card from "@/components/Card";
import TradingDestination from "@/components/TradingDestination";
import ChooseDestination from "@/components/ChooseDestination";
import Footer from "@/components/Footer";
export default function Home() {
  return (
   <>
   <Navbar />
   <Front />
   <Card />
   <ChooseDestination />
   <TradingDestination />
   <Footer />

   </>
  );
}
