import React, { useEffect, useState } from "react";
import { roomService } from "../../services/room.service";
import RoomImage from "../../assets/roomImage.jpg";
import { FiMapPin } from "react-icons/fi"; // Removi FiCalendar, pois não está sendo usado

export default function Dashboard() {
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  useEffect(() => {
    fetchRoomsAvailable();
  }, []);

  const fetchRoomsAvailable = async () => {
    try {
      const fetchedRooms = await roomService.getAvailableRooms();
      setRoomsAvailable(fetchedRooms);
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error);
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
          {/* Esquerda - Salas disponíveis */}
          <div className="w-[686px] h-full flex flex-col">
            <div className="w-full h-[262px] bg-[#6d919d9d] rounded-lg text-white text-start flex flex-col justify-center leading-10 pl-[24px]">
              <h3 className="text-[24px] w-[440px] font-semibold">
                Não é mais preciso verificar manualmente
              </h3>
              <p className="text-[20px]">
                Agende suas reuniões de forma rápida e segura
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
          <div className="w-[600px] h-[483px] bg-amber-50">
            <header className="flex justify-between pt-[20px] pb-[20px]">
              <h2 className="text-[#232323] text-[24px] font-semibold">
                Próximas Reuniões
              </h2>
              <a href="#" className="text-[#4cb269] text-[14px] font-bold">
                Ver todas
              </a>
            </header>
          </div>
        </section>
      </main>
      <footer className="w-[100%] h-[325px] bg-amber-50 mt-[20px]">
        <header className="flex justify-between pt-[20px] pb-[20px]">
          <h2 className="text-[#232323] text-[24px] font-semibold">
            Salas recomendadas
          </h2>
          <a href="#" className="text-[#4cb269] text-[14px] font-bold">
            Ver todas
          </a>
        </header>
      </footer>
    </>
  );
}
