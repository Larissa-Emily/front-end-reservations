// src/pages/Reserve/index.jsx
import React, { useState, useEffect } from "react";
import ModalReservation from "../../Components/ModalReserve/index.jsx";
import { toast } from "react-toastify";
// import SearchReservation from "../../Components/SearchReservation";
export default function Reserve() {
  const [user, setUser] = useState(null); // O usuário será carregado aqui
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [errorReservations, setErrorReservations] = useState(null);
  const [isModalReservationOpen, setIsModalReservationOpen] = useState(false);
  const [reservationToEdit, setReservationToEdit] = useState(null);

  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [filteredReservas, setFilteredReservas] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.warn("Nenhum token encontrado — usuário não autenticado.");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
    fetchReservations();
  }, [token]);

  useEffect(() => {
    if (!filterDate && !filterUser && !filterRoom) {
      setFilteredReservas([]);
      return;
    }

    let filtered = reservations;
    if (filterDate) {
      filtered = filtered.filter((r) => r.date === filterDate);
    }
    if (filterUser) {
      filtered = filtered.filter((r) =>
        r.user.name.toLowerCase().includes(filterUser.toLowerCase())
      );
    }
    if (filterRoom) {
      filtered = filtered.filter((r) =>
        r.room.name.toLowerCase().includes(filterRoom.toLowerCase())
      );
    }
    setFilteredReservas(filtered);
  }, [filterDate, filterUser, filterRoom, reservations]);

  const handleApplyFilters = () => {
    let filtered = reservations;

    if (filterDate) {
      filtered = filtered.filter((r) => r.date === filterDate);
    }
    if (filterUser) {
      filtered = filtered.filter((r) =>
        r.user.name.toLowerCase().includes(filterUser.toLowerCase())
      );
    }
    if (filterRoom) {
      filtered = filtered.filter((r) =>
        r.room.name.toLowerCase().includes(filterRoom.toLowerCase())
      );
    }

    setFilteredReservas(filtered);
  };

  const fetchReservations = async () => {
    setLoadingReservations(true);
    setErrorReservations(null);
    try {
      const response = await fetch(`http://localhost:3000/reservation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar as reservas");
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      setErrorReservations(error.message);
    } finally {
      setLoadingReservations(false);
    }
  };

  const handleOpenCreateReservationModal = () => {
    setReservationToEdit(null);
    setIsModalReservationOpen(true);
  };

  const handleOpenEditReservationModal = (reservation) => {
    setReservationToEdit(reservation);
    setIsModalReservationOpen(true);
  };

  const handleCancelReservation = async (reservationId) => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/reservation/${reservationId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao deletar a reserva!");
        }
        toast.error("Reserva cancelada com sucesso!");
        fetchReservations();
      } catch (error) {
        toast.error(error.message || "Erro ao cancelar reserva.");
      }
    }
  };

  const handleReservationSave = (savedReservation) => {
    if (reservationToEdit) {
      setReservations(
        reservations.map((res) =>
          res.id === savedReservation.id ? savedReservation : res
        )
      );
    } else {
      setReservations([...reservations, savedReservation]);
    }
    fetchReservations(); 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getStatusColor = (reservation) => {
    const now = new Date();
    const reservationDateTime = new Date(
      `${reservation.date}T${reservation.startTime}:00`
    );
    const reservationEndTime = new Date(
      `${reservation.date}T${reservation.endTime}:00`
    );
    if (reservationEndTime < now) {
      return "text-gray-400";
    } else if (reservationDateTime <= now && reservationEndTime >= now) {
      return "text-yellow-400";
    } else {
      return "text-green-400";
    }
  };

  const getStatusText = (reservation) => {
    const now = new Date();
    const reservationDateTime = new Date(
      `${reservation.date}T${reservation.startTime}:00`
    );
    const reservationEndTime = new Date(
      `${reservation.date}T${reservation.endTime}:00`
    );
    if (reservationEndTime < now) {
      return "Concluída";
    } else if (reservationDateTime <= now && reservationEndTime >= now) {
      return "Em andamento";
    } else {
      return "Agendada";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#7a7d84]">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <section>
      <div className="pb-[20px]">
        <h3 className="font-bold text-[32px] text-[#232323]">Reservar sala</h3>
      </div>
      <div className="min-h-screen p-8 border border-solid border-[#0000001A] rounded-lg">
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">Data</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B9AB8]"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              Nome do usuário
            </label>
            <input
              type="text"
              placeholder="Nome do usuário"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B9AB8]"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">
              Nome da sala
            </label>
            <input
              type="text"
              placeholder="Nome da sala"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B9AB8]"
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={handleApplyFilters}
              className="bg-[#3B9AB8] hover:bg-[#035c77] text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
            >
              Filtrar
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleOpenCreateReservationModal}
            className="bg-[#3B9AB8] hover:bg-[#035c77] text-white fnt-semibold py-2 px-4 rounded-md transition-all duration-200 cursor-pointer"
          >
            Nova Reserva
          </button>
        </div>
        {loadingReservations && (
          <p className="text-[#7a7d84]">Carregando reservas...</p>
        )}
        {errorReservations && (
          <p className="text-red-400">Erro: {errorReservations}</p>
        )}
        {!loadingReservations && reservations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredReservas.length > 0 ||
            filterDate ||
            filterUser ||
            filterRoom
              ? filteredReservas
              : reservations
            )
              .filter(
                (reservation) => getStatusText(reservation) !== "Concluída"
              )
              .map((reservation) => (
                <div
                  key={reservation.id}
                  className="p-6 rounded-lg shadow-md  w-[360px] h-[259px]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#000]">
                      {reservation.room.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        reservation
                      )}`}
                    >
                      {getStatusText(reservation)}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-[#7A7D84]">
                      <span className="font-medium">Data:</span>
                      {formatDate(reservation.date)}
                    </p>
                    <p className="text-[#7A7D84]">
                      <span className="font-medium">Horário:</span>
                      {formatTime(reservation.startTime)} -
                      {formatTime(reservation.endTime)}
                    </p>
                    <p className="text-[#7A7D84]">
                      <span className="font-medium">Local:</span>
                      {reservation.room.location || "N/A"}
                    </p>
                    <p className="text-[#7A7D84]">
                      <span className="font-medium">Responsável:</span>
                      {reservation.user.name}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditReservationModal(reservation)
                      }
                      disabled={getStatusText(reservation) === "Concluída"}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        getStatusText(reservation) === "Concluída"
                          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                          : "bg-[#3B9AB8] hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {getStatusText(reservation) === "Concluída"
                        ? "Concluída"
                        : "Editar"}
                    </button>
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      disabled={getStatusText(reservation) === "Concluída"}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        getStatusText(reservation) === "Concluída"
                          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {getStatusText(reservation) === "Concluída"
                        ? "Concluída"
                        : "Cancelar"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
        <ModalReservation
          isOpen={isModalReservationOpen}
          onClose={() => setIsModalReservationOpen(false)}
          reservationToEdit={reservationToEdit}
          onSave={handleReservationSave}
        />
      </div>
    </section>
  );
}
