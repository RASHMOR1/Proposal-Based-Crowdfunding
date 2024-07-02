import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between p-3 border-b border-deep-violet border-b-2">
      <Link href="/application/faucet">
        <button className="p-3 violet ml-4 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90">
          Mock USDT Faucet
        </button>
      </Link>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
