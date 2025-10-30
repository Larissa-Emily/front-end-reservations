import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { LuCircleUser } from "react-icons/lu";
import { IoMdHelpCircleOutline } from "react-icons/io";

export default function SideMenuUser() {
  const location = useLocation();

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: <RxDashboard className="text-xl" /> },
    { to: "/reserve", label: "Reservas", icon: <CiCalendar className="text-xl" /> },
    { to: "/profile", label: "Perfil", icon: <LuCircleUser className="text-xl" /> },
    { to: "/help", label: "Help", icon: <IoMdHelpCircleOutline className="text-xl" /> },
  ];

  return (
    <ul className="space-y-4">
      {menuItems.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.to
                ? "bg-[#3b9abb] text-white"
                : "text-[#7E7E7E] hover:text-white hover:bg-[#3b9abb]"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
