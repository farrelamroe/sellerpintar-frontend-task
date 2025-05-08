"use client";

import { UsersType } from "@/types/UserType";
import { useEffect, useState } from "react";

interface HeaderAdminProps {
  currentPage: string;
}

export default function HeaderAdmin({ currentPage }: HeaderAdminProps) {
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    const userStorage = localStorage.getItem("currentUser") || "[]";
    const parsedUser: UsersType = JSON.parse(userStorage);
    setUserName(parsedUser.username);
    setUserInitial(parsedUser.username[0]);
  }, []);

  return (
    <div className="flex w-full items-center justify-between border border-slate-200 bg-gray-50 px-[16px] py-[8px]">
      <div className="text-[16px] font-semibold text-slate-900">
        {currentPage}
      </div>

      <div>
        <div
          onClick={() => alert("Ini dicoba")}
          className="flex items-center md:gap-[8px]"
        >
          <span className="rounded-full bg-blue-200 px-[12px] py-[4px] text-[14px] font-medium text-blue-900">
            {userInitial}
          </span>
          <span className="hidden text-[14px] font-medium underline underline-offset-3 md:block">
            {userName}
          </span>
        </div>
      </div>
    </div>
  );
}
