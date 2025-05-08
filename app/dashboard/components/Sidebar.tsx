"use client";

import { Button } from "@/components/Buttons";
import { LogOut, Newspaper, Tag } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  dashboardView: string;
  setDashboardView: (view: "Articles" | "Category" | "Logout" | "") => void;
}

const menuItems = [
  {
    icon: <Newspaper size={20} color="#ffffff" />,
    label: "Articles",
    link: "",
  },
  {
    icon: <Tag size={20} color="#ffffff" />,
    label: "Category",
    link: "",
  },
  {
    icon: <LogOut size={20} color="#ffffff" />,
    label: "Logout",
    link: "",
  },
];

export default function Sidebar({
  dashboardView,
  setDashboardView,
}: SidebarProps) {
  const handleViewChange = (
    selectedLabel: "Articles" | "Category" | "Logout",
  ) => {
    setDashboardView(selectedLabel);
  };

  return (
    <div className="relative flex h-full w-full flex-col py-[20px]">
      <div className="relative mx-[16px] h-[24px] w-[134px]">
        <Image src={"/Logo.svg"} alt="" fill />
      </div>
      <nav className="mt-[32px] flex w-full flex-col gap-[4px] px-[8px]">
        {menuItems.map((item, idx) => (
          <Button
            onClick={() =>
              handleViewChange(item.label as "Articles" | "Category" | "Logout")
            }
            key={idx}
            className={`w-full justify-start bg-transparent text-left hover:bg-blue-800 ${dashboardView === item.label ? "bg-blue-500" : ""}`}
          >
            {item.icon} {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
