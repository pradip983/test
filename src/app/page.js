import Image from "next/image";
import Navbar from "@/components/Navbar";
import Front from "@/components/Front";
import Card from "@/components/Card";
import TradingDestination from "@/components/TradingDestination";
import ChooseDestination from "@/components/ChooseDestination";
import Footer from "@/components/Footer";
import Reviewweb from "@/components/Reviewweb"
export default function Home() {
  return (
    <>
      <Navbar />
      <Front />
      <Card />
      <TradingDestination />
      <ChooseDestination />
      <Reviewweb />
      <Footer />

    </>
  );
}
