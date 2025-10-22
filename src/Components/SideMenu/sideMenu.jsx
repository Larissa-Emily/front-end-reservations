import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { LuCircleUser } from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";
import Logo from "../../assets/Logo.png";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex">
      {/* Botão da logo quando o menu está fechado */}
      {!isOpen && (
        <button onClick={toggleMenu} aria-label="Abrir menu">
          <img
            src={Logo}
            alt="Logo"
            className="w-max h-30 object-contain cursor-pointer"
          />
        </button>
      )}

      {/* Menu lateral */}
      <div
        className={`flex flex-col justify-between fixed top-0 left-0 h-full bg-[#d2d8d8] text-[#7e7e7e] transition-all duration-300 z-50
        ${isOpen ? "w-64 p-4" : "w-0 overflow-hidden"}`}
      >
        {/* ---------- Topo (logo + links principais) ---------- */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="w-42 h-auto object-contain cursor-pointer"
              onClick={toggleMenu}
              aria-label="Fechar menu"
            />
          </div>

          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                onClick={toggleMenu}
                className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
              >
                <RxDashboard className="text-xl" /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/calendar"
                onClick={toggleMenu}
                className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
              >
                <CiCalendar className="text-xl" /> Calendário
              </Link>
            </li>

            <li>
              <Link
                to="/reserve"
                onClick={toggleMenu}
                className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
              >
                <CiCalendar className="text-xl" /> Reservas
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
              >
                <LuCircleUser className="text-xl" /> Perfil
              </Link>
            </li>

            <li>
              <Link
                to="/help"
                className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
              >
                <FiHelpCircle className="text-xl" /> Help
              </Link>
            </li>
          </ul>
        </div>

        {/* ---------- Rodapé (logout) ---------- */}
        <div className="border-t border-gray-300 pt-4">
          <Link
            to="/logout"
            className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 pb-12 rounded-lg"
          >
            <IoIosLogOut className="text-xl" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
