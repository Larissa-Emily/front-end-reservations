import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../Components/SideMenu/sideMenu";
import Header from "../Components/Header/header"

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixa à esquerda */}
      <aside className="w-64 bg-[#d2d8d8] text-[#7e7e7e] flex flex-col fixed top-0 left-0 h-full shadow-md">
        <div className="flex items-center justify-center py-6 border-b border-gray-300">
          <SideMenu />
        </div>
      </aside>

      {/* Conteúdo principal com header e espaço para ele */}
      <main className="ml-64 flex-1 pt-[64px] p-8">
        <Header /> {/* Header fixo */}
        <Outlet />
      </main>
    </div>
  );
}