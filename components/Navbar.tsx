import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-end p-3 border-b border-deep-violet border-b-2">
      <ConnectButton />
    </div>
  );
};

export default Navbar;
