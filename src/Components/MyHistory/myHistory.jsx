import React, { useState, useEffect } from "react";

export default function MyHistory() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0]; // Formato: yyyy-mm-dd
    setDate(hoje);
  }, []); // executa só uma vez ao montar o componente

  return (
    <div>
      <header className="flex justify-between">
        <h3 className="text-[#232323] text-[24px]">Histórico</h3>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-[#434966]"
        />
      </header>
    </div>
  );
}
