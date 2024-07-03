import "./globals.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import FarcasterIcon from "../styles/warpcast-icon.svg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mediumViolet text-white text-center py-4">
        <h1 className="text-3xl font-bold">Crowdfunding Platform</h1>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="lightViolet rounded-xl shadow-md p-8 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-violet">
            Welcome to our Crowdfunding Platform
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            This project is a blockchain-based crowdfunding platform with a
            unique twist. Unlike traditional crowdfunding where companies
            propose projects and seek funding from users, here, regular users
            make proposals to companies. If a company agrees to execute the
            proposal and sets a funding goal, the crowdfunding process
            automatically starts.
          </p>
          <p className="text-lg mb-6 text-gray-700">
            Creating a proposal costs 10 mock USDT tokens, and users can earn
            0.1 mock USDT tokens by removing outdated proposals.
          </p>

          <Link href="/application">
            <button className="p-3 violet m-0 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90">
              See The Application
            </button>
          </Link>
        </div>
      </main>
      <footer className="mediumViolet text-white text-center py-4">
        <p>&copy; 2024 Crowdfunding Platform. All rights reserved.</p>
        <div className="flex  justify-center mt-2 space-x-4">
          <a
            href="https://github.com/RASHMOR1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 flex flex-row mr-6"
          >
            <p className="mr-2"> My Github </p>
            <FaGithub size={24} />
          </a>

          <a
            href="https://warpcast.com/rashmor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 flex flex-row ml-6"
          >
            <p className="mr-2"> You can contact me via </p>
            <FarcasterIcon width={24} height={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
