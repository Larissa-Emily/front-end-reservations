import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import Logo from "../../assets/Logo.png";
import SideMenuManager from "../SideMenuManager/sideMenu";
import SideMenuUser from "../SideMenuUser/sideMenu";

export default function SideMenu() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserRole(userData?.role);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  }

  if (!userRole) return null;

  return (
    <nav className="flex flex-col fixed top-0 left-0 h-full w-[250px] bg-[#E4EBEB] text-[#7E7E7E] justify-between py-4 px-3 shadow-sm">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={Logo}
          alt="Logo"
          className="w-full object-contain  cursor-pointer"
        />
      </div>

      {/* Menu */}
      <div className="flex-1">
        {userRole === "manager" ? <SideMenuManager /> : <SideMenuUser />}
      </div>

      {/* Logout */}
      <div className="pb-[34px]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-[#7E7E7E] hover:text-white hover:bg-[#3b9abb] p-3 rounded-lg w-full text-left transition-colors"
        >
          <IoIosLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
