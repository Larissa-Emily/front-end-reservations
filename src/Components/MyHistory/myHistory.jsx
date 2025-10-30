import React, { useState, useEffect } from "react";

export default function MyHistory() {
  const [date, setDate] = useState("");
  const [userData, setUserDate] = useState([]);
  const [reserve, setReserve] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0]; // Formato: yyyy-mm-dd
    setDate(hoje);
  }, []); // executa só uma vez ao montar o componente

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserDate(userData);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      handleGetReserve(userData);
    }
  }, [userData]);

  async function handleGetReserve(userData) {
    try {
      const response = await fetch(
        `http://localhost:3000/reservation/user/${userData.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário por id");
      }
      const data = await response.json();
      setReserve(data);
    } catch (error) {
      console.error(error);
    }
  }
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
      <section>
        {reserve.length === 0 ? (
                <p className="text-[#7a7d84]">Nenhum histórico de reunião .</p>
              ) : (
                reserve
                  .sort(
                    (a, b) =>
                      new Date(a.date + "T" + a.startTime) -
                      new Date(b.date + "T" + b.startTime)
                  ) // Ordena por data/hora
                  .slice(0, 3)
                  .map((reserve) => (
                    <div
                      key={reserve.id}
                      className="p-4  border-b border-[#7a7d847e] flex flex-col gap-1"
                    >
                      <h3 className="text-[16px] font-semibold text-[#000]">
                        {reserve.room.name}
                      </h3>
                      <p className="text-[#7a7d84] text-[14px]">
                        <span className="font-medium">Data:</span>{" "}
                        {new Date(reserve.date).toLocaleDateString("pt-BR", {
                          weekday: "short",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-[#7a7d84] text-[14px]">
                        <span className="font-medium">Horário:</span>{" "}
                        {reserve.startTime} - {reserve.endTime}
                      </p>
                    </div>
                  ))
              )}
      </section>
    </div>
  );
}
