import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBarReservation({ onSearch }) {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    onSearch({ userName, roomName, date });
  }

  function handleClear() {
    setUserName("");
    setRoomName("");
    setDate("");
    onSearch({ userName: "", roomName: "", date: "" });
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-end gap-4 bg-white p-4 rounded-lg shadow-sm"
    >
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="userName" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Usuário
        </label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Digite o nome do usuário"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
          Sala
        </label>
        <input
          id="roomName"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Digite o nome da sala"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Data
        </label> 
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiSearch className="text-lg" />
          Buscar
        </button>

        {(userName || roomName || date) && (
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
  );
}
