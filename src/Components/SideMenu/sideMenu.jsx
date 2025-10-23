import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { LuCircleUser } from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";
import { GiConversation } from "react-icons/gi";
import Logo from "../../assets/Logo.png";
import { authService } from "../../services/auth.service";
export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const user = authService.getUser();
    setUserRole(user?.role);
  }, []);
  if (!userRole) return null;

  function handleLogout() {
    authService.logout();
    navigate("/");
  }
  return (
    <div className="flex">
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
      <nav
        className={`flex flex-col  fixed top-0 left-0 h-full bg-[#d2d8d8] text-[#7e7e7e] transition-all duration-300 z-50
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
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <RxDashboard className="text-xl" /> Dashboard
            </Link>

            <Link
              to="/calendar"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <CiCalendar className="text-xl" /> Calendário
            </Link>
            <Link
              to="/reserve"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <CiCalendar className="text-xl" /> Reservas
            </Link>
            <Link
              to="/profile"
              onClick={toggleMenu}
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <LuCircleUser className="text-xl" /> Perfil
            </Link>
            <Link
              to="/help"
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <FiHelpCircle className="text-xl" /> Help
            </Link>
          </ul>
        </div>
        {userRole === "manager" && (
          <>
            <Link
              to="/user"
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <LuCircleUser className="text-xl" />
              Usuários
            </Link>

            <Link
              to="/romm"
              className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg"
            >
              <GiConversation />
              Salas
            </Link>
          </>
        )}

        {/* ---------- Rodapé (logout) ---------- */}
        <div className="border-t border-gray-300 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-2 rounded-lg w-full text-left"
          >
            <IoIosLogOut className="text-xl" /> Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
