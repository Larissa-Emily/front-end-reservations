import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { LuCircleUser } from "react-icons/lu";
import { GiConversation } from "react-icons/gi";

export default function SideMenuManager({ isOpen }) {
  return (
    <ul className="space-y-2">
      <li>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg transition-colors"
        >
          <RxDashboard className="text-xl flex-shrink-0" />
          {isOpen && <span>Dashboard</span>}
        </Link>
      </li>

      <li>
        <Link
          to="/calendar"
          className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg transition-colors"
        >
          <CiCalendar className="text-xl flex-shrink-0" />
          {isOpen && <span>Calendário</span>}
        </Link>
      </li>

      <li>
        <Link
          to="/reserve"
          className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg transition-colors"
        >
          <CiCalendar className="text-xl flex-shrink-0" />
          {isOpen && <span>Reservas</span>}
        </Link>
      </li>

      <li>
        <Link
          to="/user"
          className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg transition-colors"
        >
          <LuCircleUser className="text-xl flex-shrink-0" />
          {isOpen && <span>Usuários</span>}
        </Link>
      </li>

      <li>
        <Link
          to="/room"
          className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg transition-colors"
        >
          <GiConversation className="text-xl flex-shrink-0" />
          {isOpen && <span>Salas</span>}
        </Link>
      </li>

      <li>
        <Link
          to="/profile"
          className="flex items-center gap-3 text-[#7e7e7e] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg transition-colors"
        >
          <LuCircleUser className="text-xl flex-shrink-0" />
          {isOpen && <span>Perfil</span>}
        </Link>
      </li>
    </ul>
  );
}
