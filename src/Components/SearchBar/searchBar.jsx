
import React from "react";
import { FiSearch, FiMapPin, FiUsers, FiCalendar } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-[900px] mx-auto">
      {/* Nome da sala */}
      <div className="flex items-center gap-2 px-4">
        <FiSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Nome da sala"
          className="outline-none placeholder-gray-400 text-gray-700 w-[130px]"
        />
      </div>

      <div className="h-6 w-px bg-gray-300" />

      {/* Características */}
      <div className="flex items-center gap-2 px-4">
        <FiMapPin className="text-gray-400" />
        <span className="text-gray-500">Características</span>
      </div>

      <div className="h-6 w-px bg-gray-300" />

      {/* Local */}
      <div className="flex items-center gap-2 px-4">
        <FiMapPin className="text-gray-400" />
        <span className="text-gray-500">Local</span>
      </div>

      <div className="h-6 w-px bg-gray-300" />

      {/* Capacidade */}
      <div className="flex items-center gap-2 px-4">
        <FiUsers className="text-gray-400" />
        <span className="text-gray-500">Capacidade</span>
      </div>

      <div className="h-6 w-px bg-gray-300" />

      {/* Data */}
      <div className="flex items-center gap-2 px-4">
        <FiCalendar className="text-gray-400" />
        <span className="text-gray-500">Data</span>
      </div>

      {/* Botão */}
      <button className="ml-4 bg-[#3b8ea5] text-white px-6 py-2 rounded-full hover:bg-[#327c92] transition">
        Buscar
      </button>
    </div>
  );
}
