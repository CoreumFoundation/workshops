import React from "react";
import HeroSection from "../components/HeroSection";
import UserStats from "../components/UserStats";
import StatsCards from "../components/StatsCards";
import RewardsSection from "../components/RewardsSection";
import Countdown from "../components/Countdown";
import TradingSection from "../components/TradingSection";
import TicketsTable from "../components/TicketsTable";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="col-span-2 flex flex-col items-center">
      <HeroSection />
      <UserStats />
      <StatsCards />
      <RewardsSection />
      <Countdown />
      <TradingSection />
      <TicketsTable />
      {/* <Footer /> */}
    </main>
  );
}
