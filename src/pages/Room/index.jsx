import React, { useState, useEffect } from "react";
import { roomService } from "../../services/room.service";
import { authService } from "../../services/auth.service";
import ModalRoom from "../../Components/ModalRoom/index";
import SearchBar from "../../Components/SearchBar/searchBar"; // ← CAMINHO CORRETO E IMPORTAÇÃO PADRÃO

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [errorRooms, setErrorRooms] = useState(null);
  const [isModalRoomOpen, setIsModalRoomOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [filters, setFilters] = useState({
    // ← NOVO ESTADO PARA MÚLTIPLOS FILTROS
    name: "",
    capacity: "",
    characteristics: "", // Mapeia para 'description' ou outra característica
    location: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoadingRooms(true);
    setErrorRooms(null);
    try {
      const fetchedRooms = await roomService.getAllRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error);
      setErrorRooms(error.message || "Erro ao carregar salas.");
    } finally {
      setLoadingRooms(false);
    }
  };

  const handleOpenCreateRoomModal = () => {
    setRoomToEdit(null);
    setIsModalRoomOpen(true);
  };

  const handleOpenEditRoomModal = (room) => {
    setRoomToEdit(room);
    setIsModalRoomOpen(true);
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Tem certeza que deseja deletar esta sala?")) {
      try {
        await roomService.deleteRoom(roomId);
        alert("Sala deletada com sucesso!");
        fetchRooms();
      } catch (error) {
        console.error("❌ Erro ao deletar sala:", error);
        alert(error.message || "Erro ao deletar sala.");
      }
    }
  };

  const handleRoomSave = () => {
    fetchRooms();
  };

  // Função para receber os filtros do SearchBar
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  // Lógica de filtro: filtra as salas com base nos múltiplos filtros
  const filteredRooms = rooms.filter((room) => {
    const matchName = filters.name
      ? room.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchDescription = filters.characteristics
      ? room.description
          ?.toLowerCase()
          .includes(filters.characteristics.toLowerCase())
      : true;
    const matchLocation = filters.location
      ? room.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchCapacity = filters.capacity
      ? room.capacity >= parseInt(filters.capacity)
      : true; // Filtra por capacidade mínima

    return matchName && matchDescription && matchLocation && matchCapacity;
  });

  return (
    <section>
      <div className="pb-[20px]">
        <h3 className="font-bold text-[32px] text-[#232323]">Salas</h3>
      </div>
      <div className="mt-8 border-1 border-[#7a7d8439] rounded-lg h-[600px] p-[25px]">
        <div className="flex flex-col  mb-6 p-[20px]">
          {/* Passa a função handleSearch para o SearchBar */}
          <SearchBar onSearch={handleSearch} />
          <div className="flex justify-end">
            {authService.isManager() && (
              <button
                onClick={handleOpenCreateRoomModal}
                className="w-[113px] mt-10 mr-4 bg-[#3B9AB8] hover:bg-[#056e8e] text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 cursor-pointer"
              >
                Nova Sala
              </button>
            )}
          </div>
        </div>
        {loadingRooms && (
          <p className="text-[#00000098]">Carregando salas...</p>
        )}
        {errorRooms && <p className="text-red-400">Erro: {errorRooms}</p>}

        {!loadingRooms && filteredRooms.length === 0 && !errorRooms && (
          <p className="text-[#00000098]">
            Nenhuma sala encontrada com os filtros aplicados.
          </p>
        )}

        {!loadingRooms && filteredRooms.length > 0 && (
          <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-6 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className=" p-4 rounded-lg shadow-md border border-[#e5e5e5]"
              >
                <h3 className="text-[18px] text-[#000]">{room.name}</h3>
                <p className="text-[14px] text-[#7a7d84] mb-1">
                  {room.description || "N/A"}
                </p>
                <p className="text-[14px] text-[#3b9abb] pb-2 mb-2 border-b-1 border-[#7a7d8439]">
                  {room.location || "N/A"}
                </p>
                <p className="text-[14px] text-[#7a7d84] mb-1 ">
                  <p>Capacidade: {room.capacity} pessoas</p>
                </p>
                <p className="text-[14px] text-[#7a7d84] mb-4">
                  Status:
                  <span
                    className={`font-medium ${
                      room.isAvailable ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {room.isAvailable ? "Disponível" : "Indisponível"}
                  </span>
                </p>
                {authService.isManager() && (
                  <div className="flex justify-center gap-2 mt-4 ">
                    <button
                      onClick={() => handleOpenEditRoomModal(room)}
                      className="bg-[#3b9abb] hover:bg-[#1b718e] text-white text-sm py-1 px-3 rounded-md transition-all duration-200 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="bg-[#b83b3b] hover:bg-[#901b1b] text-white text-sm py-1 px-3 rounded-md transition-all duration-200 cursor-pointer"
                    >
                      Deletar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Modal para Criar/Editar Salas */}
        <ModalRoom
          isOpen={isModalRoomOpen}
          onClose={() => setIsModalRoomOpen(false)}
          roomToEdit={roomToEdit}
          onSave={handleRoomSave}
        />
      </div>
    </section>
  );
}
