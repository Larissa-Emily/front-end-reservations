import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import Logo from "../../assets/Logo.png";
import { authService } from "../../services/auth.service";
import SideMenuManager from "../SideMenuManager/sideMenu";
import SideMenuUser from "../SideMenuUser/sideMenu";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const user = authService.getUser();
    setUserRole(user?.role);
  }, []);

  function handleLogout() {
    authService.logout();
    navigate("/");
  }

  if (!userRole) return null;

  return (
    <>
      {/* Botão pra abrir quando tá fechado */}
      {!isOpen && (
        <button 
          onClick={toggleMenu} 
          className="fixed top-4 left-4 z-50"
          aria-label="Abrir menu"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-16 h-16 object-contain cursor-pointer"
          />
        </button>
      )}

      {/* Menu lateral */}
      <nav
        className={`flex flex-col fixed top-0 left-0 h-full bg-[#d2d8d8] text-[#7e7e7e] transition-all duration-300 z-50
        ${isOpen ? "w-64 p-4" : "w-0 overflow-hidden"}`}
      >
        {/*  (clica pra fechar) */}
        <div className="flex items-center justify-between mb-6">
          <img
            src={Logo}
            alt="Logo"
            className="w-42 h-auto object-contain cursor-pointer"
            onClick={toggleMenu}
            aria-label="Fechar menu"
          />
        </div>

        {/* Renderiza o menu baseado no role */}
        <div className="flex-1 overflow-y-auto">
          {userRole === "manager" ? (
            <SideMenuManager isOpen={isOpen} />
          ) : (
            <SideMenuUser isOpen={isOpen} />
          )}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-300 pt-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg w-full text-left transition-colors"
          >
            <IoIosLogOut className="text-xl" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </nav>
    </>
  );
}
