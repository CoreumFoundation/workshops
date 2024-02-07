import { Noto_Sans } from "next/font/google";
import { Header } from "../components/Header";

import Bar from "@/components/Utils/Bar";
import { useState } from "react";
import Mint from "@/components/NFT/Mint";
import CreateCollection from "@/components/NFT/CreateCollection";
import Preview from "@/components/NFT/Preview";
import Footer from "@/components/Footer";
import Send from "@/components/NFT/Send";

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const tabs = [
    { name: "Create Collection", href: "#", current: true },
    { name: "Mint NFT", href: "#", current: false },
    { name: "Preview NFTs", href: "#", current: false },
    { name: "Send NFT", href: "#", current: false },
  ];

  const [curentTab, setCurrentTab] = useState("Create collection");

  function renderSwitch() {
    switch (curentTab) {
      case "Create Collection":
        return <CreateCollection />;
      case "Mint NFT":
        return <Mint />;
      case "Preview NFTs":
        return <Preview />;
      case "Send NFT":
        return <Send />;
    }
  }

  const [enabled, setEnabled] = useState(false);

  return (
    <div className={`bg-[#0B161E] ${notoSans.className}`}>
      <Header />
      <div className="text-white text-center my-5 rounded-md p-10 ">
        <h1 className="bg-gradient-to-r from-gray-900 via-gray-100 to-gray-900 text-transparent bg-clip-text text-6xl text-center leading-relax">
          Boostrap WebApp Development on{" "}
          <a className="font-semibold text-[#25D695]">Coreum</a>
        </h1>
        <p className="mt-5 font-mon">
          Find the codebase on{" "}
          <a
            target="blank"
            href="https://github.com/CoreumFoundation/workshops"
            className="text-blue-300"
          >
            Github
          </a>
        </p>
      </div>

      <div className="min-h-1/2 container mx-auto bg-no-repeat bg-cover bg-[url('https://www.coreum.com/assets/images/home/hero/hero-main-bg.svg')] rounded-md">
        {/* <div className="min-h-1/2 pb-10 container mx-auto rounded-md bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-emerald-500 via-emerald-900 to-gray"> */}
        <Bar tabs={tabs} curentTab={curentTab} setCurrentTab={setCurrentTab} />
        {renderSwitch()}
      </div>
      <Footer />
    </div>
  );
}
