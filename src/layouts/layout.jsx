import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../Components/SideMenu/sideMenu";
import Header from "../Components/Header/header"

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="bg-[#d2d8d8] flex flex-col fixed top-0 left-0 h-full shadow-md">
        <div className="flex items-center justify-center ">
          <SideMenu />
        </div>
      </aside>

      <main className="ml-64 flex-1 pt-[64px] p-10">
        <Header /> 
        <Outlet />
      </main>
    </div>
  );
}