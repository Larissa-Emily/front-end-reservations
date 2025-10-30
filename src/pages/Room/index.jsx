import React, { useState, useEffect } from "react";
import ModalRoom from "../../Components/ModalRoom/index";
import SearchBar from "../../Components/SearchBar/searchBar"; // ← CAMINHO CORRETO E IMPORTAÇÃO PADRÃO
import { toast } from "react-toastify";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [errorRooms, setErrorRooms] = useState(null);
  const [isModalRoomOpen, setIsModalRoomOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    capacity: "",
    characteristics: "", 
    location: "",
  });
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserRole = user?.role;
  useEffect(() => {
    if (!token) {
      console.warn("Nenhum token encontrado — usuário não autenticado.");
      return;
    }
    fetchRooms();
  }, [token]);

  const fetchRooms = async () => {
    setLoadingRooms(true);
    setErrorRooms(null);

    try {
      const fetchedRooms = await fetch(`http://localhost:3000/room`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!fetchedRooms.ok) {
        throw new Error("Erro ao buscar salas.");
      }
      const data = await fetchedRooms.json();
      setRooms(data);
    } catch (error) {
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
        const response = await fetch(`http://localhost:3000/room/${roomId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          toast.error("Erro ao deletar sala!");
          return;
        }
        toast.success("Sala deletada com sucesso!");
        fetchRooms();
      } catch (error) {
        toast.error(error.message || "Erro ao deletar sala.");
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
          <SearchBar onSearch={handleSearch} />
          <div className="flex justify-end">
            {currentUserRole === "manager" && (
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
                  <span>Capacidade: {room.capacity} pessoas</span>
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
              </div>
            ))}
          </div>
        )}
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
