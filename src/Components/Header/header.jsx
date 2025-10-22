// src/Components/Header.js
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "../../assets/Image.jpg"
export default function Header() {
  return (
    <header className="w-full h-auto flex justify-between items-center ">
      <div>
        <span className=" text-[20px] text-[#747474]">Olá, Usuario</span>
      </div>
      <ul className="flex gap-5 mr-10">
        <li>
          <IoNotificationsOutline className="w-[24px] h-[24px]" />
        </li>
        <li className="flex">
          <img
            className="w-[36px] h-[36px] rounded-full mr-2"
            src={Image}
            alt=""
          />
          <span className="text-[16px]">Larissa</span>
        </li>
      </ul>
    </header>
  );
}
