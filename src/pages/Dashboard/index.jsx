import React, { useEffect, useState } from "react";
import RoomImage from "../../assets/roomImage.jpg";
import { FiMapPin } from "react-icons/fi"; // Removi FiCalendar, pois não está sendo usado

export default function Dashboard() {
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const token = localStorage.getItem("access_token");
  useEffect(() => {
    if (!token) {
      console.log("Nenhum token encontrado — usuário não autenticado.");
      return;
    }
    fetchRoomsAvailable();
    fetchMeetings();
  }, [token]);

  const fetchRoomsAvailable = async () => {
    try {
      const fetchedRooms = await fetch(`http://localhost:3000/room/available`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!fetchedRooms.ok) {
        throw new Error("Erro ao listar salas disponiveis");
        return;
      }

      const data = await fetchedRooms.json();
      console.log(`Recebendo as salavas habilitadas: ${data}`);
      setRoomsAvailable(data);
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const fetchedMeetings = await fetch(`http://localhost:3000/reservation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!fetchedMeetings.ok) {
        throw new Error("Erro ao listar reservas");
        return;
      }

      const data = await fetchedMeetings.json();
      console.log(`Recebendo as reservas: ${data}`);
      setMeetings(data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };
  return (
    <>
      <header className="flex justify-between">
        <div className="flex flex-col">
          <ul>
            <li>
              <h1 className=" text-[#232323] text-[32px] font-bold">
                Bem vindo-(a) de volta
              </h1>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <section className="mt-[20px] flex gap-x-20 ">
          <div className="w-[686px] h-full flex flex-col">
            <div className="w-full h-[262px] bg-[#6d919d9d] rounded-lg text-white text-start flex flex-col justify-center leading-10 pl-[24px]">
              <h3 className="text-[24px] w-[440px] font-semibold">
                Não é mais preciso verificar manualmente
              </h3>
              <p className="text-[20px]">
                Agende suas reuniões de forma rápida e segura.
              </p>
            </div>
            <div>
              <header className="flex justify-between pt-[20px] pb-[20px]">
                <h2 className="text-[#232323] text-[24px] font-semibold">
                  Salas disponíveis
                </h2>
                <a
                  href="/room"
                  className="text-[#4cb269] text-[14px] font-bold"
                >
                  Ver todas
                </a>
              </header>
              <div className="flex gap-4 overflow-x-auto">
                {roomsAvailable.slice(0, 3).map((room) => (
                  <div
                    key={room.id}
                    className="min-w-[200px] h-[130px] flex flex-col justify-between p-3 rounded-xl shadow-sm border border-[#e5e5e5] bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={RoomImage}
                        alt="image room"
                        className="w-[68px] h-[60px] object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-[15px] font-medium text-[#000] leading-tight">
                          {room.name}
                        </h3>
                        <p className="text-[13px] text-[#7a7d84]">
                          {room.description || "N/A"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#3b9abb] flex items-center gap-1">
                      <FiMapPin /> {room.location || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[600px] h-[483px]  p-4 border border-solid border-[#0000001A] rounded-lg overflow-y-auto">
            <header className="flex justify-between pt-[20px] pb-[20px]">
              <h2 className="text-[#232323] text-[24px] font-semibold">
                Próximas Reuniões
              </h2>
              <a
                href="/reserve"
                className="text-[#4cb269] text-[14px] font-bold"
              >
                Ver todas
              </a>
            </header>
            <div className="flex flex-col gap-4">
              {meetings.length === 0 ? (
                <p className="text-[#7a7d84]">Nenhuma reunião agendada.</p>
              ) : (
                meetings
                  // 🔹 Filtra apenas as reuniões futuras
                  .filter((meeting) => {
                    const meetingDateTime = new Date(
                      `${meeting.date}T${meeting.startTime}`
                    );
                    return meetingDateTime > new Date(); // mantém apenas futuras
                  })
                  // 🔹 Ordena por data/hora
                  .sort(
                    (a, b) =>
                      new Date(`${a.date}T${a.startTime}`) -
                      new Date(`${b.date}T${b.startTime}`)
                  )
                  // 🔹 Mostra apenas as 3 próximas
                  .slice(0, 3)
                  .map((meeting) => (
                    <div
                      key={meeting.id}
                      className="p-4 rounded-lg shadow-sm bg-white border border-[#e5e5e5] flex flex-col gap-1"
                    >
                      <h3 className="text-[16px] font-semibold text-[#000]">
                        {meeting.room.name}
                      </h3>
                      <p className="text-[#7a7d84] text-[14px]">
                        <span className="font-medium">Data:</span>{" "}
                        {new Date(meeting.date).toLocaleDateString("pt-BR", {
                          weekday: "short",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-[#7a7d84] text-[14px]">
                        <span className="font-medium">Horário:</span>{" "}
                        {meeting.startTime} - {meeting.endTime}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
