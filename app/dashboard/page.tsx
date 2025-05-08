"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AdminArticlePage from "./components/Article";
import CategoryAdminPage from "./components/Category";
import LogoutAdminPage from "./components/Logout";

export default function DashboardAdmin() {
  const [dashboardView, setDashboardView] = useState<
    "Articles" | "Category" | "Logout" | ""
  >("Articles");

  return (
    <div className="grid h-screen w-screen grid-cols-[240px_1fr]">
      <section className="h-full w-full bg-blue-600">
        <Sidebar
          dashboardView={dashboardView}
          setDashboardView={setDashboardView}
        />
      </section>

      <section className="h-full w-full bg-gray-100">
        {dashboardView === "Articles" && (
          <div>
            <AdminArticlePage />
          </div>
        )}
        {dashboardView === "Category" && (
          <div>
            <CategoryAdminPage />
          </div>
        )}
        {dashboardView === "Logout" && (
          <div>
            <LogoutAdminPage />
          </div>
        )}
      </section>
    </div>
  );
}
