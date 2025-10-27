// src/pages/Reserve/index.jsx
import React, { useState, useEffect } from "react";
import { reservationService } from "../../services/reserve.service"; // ← CAMINHO CORRETO para o serviço de reserva
import { authService } from "../../services/auth.service";
import ModalReservation from "../../components/ModalReserve/index"; // ← CAMINHO CORRETO para o modal
export default function ReservePage() {
  // Renomeado para ReservePage
  const [user, setUser] = useState(null); // O usuário será carregado aqui
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [errorReservations, setErrorReservations] = useState(null);
  const [isModalReservationOpen, setIsModalReservationOpen] = useState(false);
  const [reservationToEdit, setReservationToEdit] = useState(null);
  const [viewMode, setViewMode] = useState("my"); // Padrão para "Minhas Reservas" para usuários comuns

  useEffect(() => {
    const currentUser = authService.getUserFromStorage();
    if (!currentUser) {
      // Redirecionar para login se não estiver logado
      // Ou lidar com o estado de não logado
      console.log("[ReservePage] Usuário não logado.");
      setUser(null);
      setLoadingReservations(false);
      return;
    }
    setUser(currentUser);
    // Managers podem ver todas as reservas por padrão, usuários veem as suas
    if (authService.isManager()) {
      setViewMode("all");
    } else {
      setViewMode("my");
    }
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => {
    if (user) {
      // Só busca se o usuário estiver carregado
      fetchReservations();
    }
  }, [viewMode, user]); // Adiciona user como dependência

  const fetchReservations = async () => {
    console.log("[ReservePage] fetchReservations called.");
    setLoadingReservations(true);
    setErrorReservations(null);
    try {
      let fetchedReservations;
      if (viewMode === "my" && user) {
        console.log(
          `[ReservePage] Fetching user reservations for ID: ${user.id}`
        );
        fetchedReservations = await reservationService.getUserReservations(
          user.id
        );
      } else if (viewMode === "all" && authService.isManager()) {
        console.log("[ReservePage] Fetching all reservations (manager).");
        fetchedReservations = await reservationService.getAllReservations();
      } else {
        // Fallback para usuários não-manager que tentem ver "all" ou sem user
        fetchedReservations = [];
        setErrorReservations(
          "Você não tem permissão para ver todas as reservas ou o usuário não está logado."
        );
      }
      console.log(
        "[ReservePage] Fetched reservations successfully:",
        fetchedReservations
      );
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("❌ [ReservePage] Erro ao buscar reservas:", error);
      setErrorReservations(error.message || "Erro ao carregar reservas.");
    } finally {
      setLoadingReservations(false);
      console.log(
        "[ReservePage] fetchReservations finished. Loading state set to false."
      );
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
        await reservationService.cancelReservation(reservationId);
        alert("Reserva cancelada com sucesso!");
        fetchReservations();
      } catch (error) {
        console.error("❌ Erro ao cancelar reserva:", error);
        alert(error.message || "Erro ao cancelar reserva.");
      }
    }
  };

  const handleReservationSave = (savedReservation) => {
    // Atualiza a lista de reservas no estado local
    if (reservationToEdit) {
      setReservations(
        reservations.map((res) =>
          res.id === savedReservation.id ? savedReservation : res
        )
      );
    } else {
      setReservations([...reservations, savedReservation]);
    }
    fetchReservations(); // Recarrega as reservas para garantir a lista mais atualizada
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
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleOpenCreateReservationModal}
            className="bg-[#3B9AB8] hover:bg-[#035c77] text-white fnt-semibold py-2 px-4 rounded-md transition-all duration-200 cursor-pointer"
          >
            Nova Reserva
          </button>
        </div>
        {authService.isManager() && (
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === "all"
                  ? "bg-[#3B9AB8] text-white"
                  : "bg-white/1 text-[#3B9AB8] hver:bg-white/2"
              } cursor-pointer`}
            >
              Todas as Reservas
            </button>
            <button
              onClick={() => setViewMode("my")}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === "my"
                  ? "bg-[#3B9AB8] text-white"
                  : "bg-white/1 text-[#3B9AB8] hver:bg-white/2"
              } cursor-pointer`}
            >
              Minhas Reservas
            </button>
          </div>
        )}
        {loadingReservations && (
          <p className="text-[#7a7d84]">Carregando reservas...</p>
        )}
        {errorReservations && (
          <p className="text-red-400">Erro: {errorReservations}</p>
        )}
        {!loadingReservations &&
          reservations.length === 0 &&
          !errorReservations && (
            <p className="text-[#7a7d84]">
              
              {viewMode === "my"
                ? "Você não tem reservas."
                : "Nenhuma reserva encontrada."}
            </p>
          )}
        {!loadingReservations && reservations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
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
                    onClick={() => handleOpenEditReservationModal(reservation)}
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
