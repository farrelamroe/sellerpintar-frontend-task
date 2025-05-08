"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { UsersType } from "@/types/UserType";

interface TopBarProps {
  blueLogo: string;
  whiteLogo: string;
  blueLogoStyle: string;
  whiteLogoStyle: string;
  nameStyle: string;
  containerStyle?: string;
  menuLabel?: string;
}

export default function TopBar({
  blueLogo,
  whiteLogo,
  blueLogoStyle,
  whiteLogoStyle,
  nameStyle,
  containerStyle,
  menuLabel,
}: TopBarProps) {
  const [displayName, setDisplayName] = useState<string>("");
  const [initialLetter, setInitialLetter] = useState<string>("");

  useEffect(() => {
    const storedData = localStorage.getItem("currentUser") || "[]";

    if (storedData) {
      const parsedUser: UsersType = JSON.parse(storedData);
      setDisplayName(parsedUser.username);
      setInitialLetter(parsedUser.username[0]);
    }
  }, []);

  return (
    <header
      className={`fixed z-[50] flex h-[64px] w-full items-center justify-between bg-white px-[40px] md:bg-transparent md:px-[72px] md:py-[40px] ${containerStyle}`}
    >
      <div className="relative h-[80px] w-[35vw] md:w-[180px] lg:h-[24px] lg:w-[134px]">
        <Image src={blueLogo} fill alt="Logo" className={blueLogoStyle} />
        <Image src={whiteLogo} fill alt="Logo" className={whiteLogoStyle} />
        <p>{menuLabel}</p>
      </div>

      <div
        onClick={() => alert("Ini ujicoba")}
        className="flex items-center md:gap-[8px]"
      >
        <span className="h-fit w-fit rounded-full bg-blue-200 px-[12px] py-[4px] font-medium text-blue-900">
          {initialLetter}
        </span>
        <span
          className={`hidden font-medium underline underline-offset-[3px] md:block md:text-[14px] ${nameStyle}`}
        >
          {displayName}
        </span>
      </div>
    </header>
  );
}
