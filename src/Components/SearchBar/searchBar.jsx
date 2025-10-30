import React, { useState } from "react";
import { FiSearch, FiMapPin, FiUsers } from "react-icons/fi"; // Removi FiCalendar, pois não está sendo usado

export default function SearchBar({ onSearch }) { // ← CORRIGIDO: onSearch
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    onSearch({ name, capacity, characteristics, location });
  }

  function handleClear() {
    setName("");
    setCapacity("");
    setCharacteristics("");
    setLocation("");
    onSearch({ name: "", capacity: "", characteristics: "", location: "" });
  }

  // Verifica se algum campo de filtro está preenchido para mostrar o botão "Limpar"
  const hasFilters = name || capacity || characteristics || location;

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap items-center bg-white shadow-md rounded-full px-4 py-2 w-full justify-between"
      >
        {/* Nome da sala */}
        <div className="flex items-center gap-2 px-4">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Nome da sala"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            className="outline-none placeholder-gray-400 text-gray-700 w-[130px]"
          />
        </div>
        <div className="flex items-center gap-2 px-4">
          <FiSearch className="text-gray-400" /> 
          <input
            type="text"
            placeholder="Características"
            value={characteristics}
            onChange={(e) => setCharacteristics(e.target.value)} 
            className="outline-none placeholder-gray-400 text-gray-700 w-[130px]"
          />
        </div>
        <div className="flex items-center gap-2 px-4">
          <FiMapPin className="text-gray-400" />
          <input
            type="text"
            placeholder="Local"
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            className="outline-none placeholder-gray-400 text-gray-700 w-[130px]"
          />
        </div>
        {/* Capacidade */}
        <div className="flex items-center gap-2 px-4">
          <FiUsers className="text-gray-400" />
          <input
            type="number" 
            placeholder="Capacidade"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)} 
            className="outline-none placeholder-gray-400 text-gray-700 w-[130px]"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 w-[113px] bg-[#3B9AB8] text-white font-medium rounded-lg hover:bg-[#056e8e]transition-colors cursor-pointer"
          >
            <FiSearch className="text-lg" />
            Buscar
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
