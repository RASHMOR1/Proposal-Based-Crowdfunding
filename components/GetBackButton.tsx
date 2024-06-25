import React from "react";
import Link from "next/link";

const GetBackButton = () => {
  return (
    <div className="flex pt-6 pl-6 m-0 w-full justify-start">
      <Link href="/application">
        <button className="p-3 violet m-0 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90">
          Get Back
        </button>
      </Link>
    </div>
  );
};

export default GetBackButton;
