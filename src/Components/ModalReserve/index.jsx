// src/components/ModalReserve/index.jsx
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { reservationService } from "../../services/reserve.service"; // ← CAMINHO CORRETO para o serviço de reserva
import { roomService } from "../../services/room.service"; // ← CAMINHO CORRETO para o serviço de sala
import { authService } from "../../services/auth.service";

export default function ModalReservation({ isOpen, onClose, reservationToEdit, onSave }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const currentUserId = authService.getUserFromStorage()?.id;

  useEffect(() => {
    if (isOpen) {
      loadAvailableRooms();
      if (reservationToEdit) {
        setDate(reservationToEdit.date.split('T')[0]);
        setStartTime(reservationToEdit.startTime);
        setEndTime(reservationToEdit.endTime);
        setRoomId(reservationToEdit.roomId.toString());
      } else {
        setDate("");
        setStartTime("");
        setEndTime("");
        setRoomId("");
      }
      setError(null);
    }
  }, [isOpen, reservationToEdit]);

  const loadAvailableRooms = async () => {
    setLoadingRooms(true);
    try {
      const availableRooms = await roomService.getAvailableRooms();
      setRooms(availableRooms);
    } catch (error) {
      console.error("❌ Erro ao carregar salas disponíveis:", error);
      setError("Erro ao carregar salas disponíveis.");
    } finally {
      setLoadingRooms(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!date || !startTime || !endTime || !roomId) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(`${date}T${endTime}:00`);
    const now = new Date();

    if (start < now) {
      setError("Não é permitido reservar para um horário no passado.");
      return;
    }

    if (end <= start) {
      setError("O horário de término deve ser posterior ao horário de início.");
      return;
    }

    if ((end.getTime() - start.getTime()) / (1000 * 60) < 60) {
      setError("A duração mínima de uma reserva é de 1 hora.");
      return;
    }

    if (!currentUserId) {
      setError("ID do usuário não encontrado. Por favor, faça login novamente.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const reservationData = {
      date,
      startTime,
      endTime,
      roomId: parseInt(roomId),
      userId: currentUserId,
    };

    try {
      let result;
      if (reservationToEdit) {
        result = await reservationService.updateReservation(reservationToEdit.id, reservationData);
        alert("Reserva atualizada com sucesso!");
      } else {
        result = await reservationService.createReservation(reservationData);
        alert("Reserva criada com sucesso!");
      }
      onSave(result);
      onClose();
    } catch (err) {
      console.error("❌ Erro ao salvar reserva:", err);
      setError(err.message || "Erro ao salvar reserva.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay (fundo escuro) */}
      <div
        className="fixed inset-0 bg-[#0e48868f] bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg text-center border border-white/20 relative">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#7a7d84] hover:text-white transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            {reservationToEdit ? "Editar Reserva" : "Nova Reserva"}
          </h1>
          <span className="text-[#7a7d84] text-sm mb-6 block">
            {reservationToEdit ? "Atualize os dados da reserva" : "Preencha os dados da nova reserva"}
          </span>

          {error && (
            <div className="bg-red-500 text-white p-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Data */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
              min={new Date().toISOString().split('T')[0]}
              className="p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />

            {/* Horário de Início */}
            <div className="flex gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={loading}
                className="flex-1 p-3 rounded-md bg-[#ffffff79] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
              <span className="text-white self-center">até</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={loading}
                className="flex-1 p-3 rounded-md bg-[#ffffff79] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>

            {/* Sala */}
            <div className="relative">
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                disabled={loading || loadingRooms}
                className="w-full p-3 rounded-md bg-[#a3a3a398] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              >
                <option value="">Selecione uma sala</option>
                {loadingRooms ? (
                  <option disabled>Carregando salas...</option>
                ) : (
                  rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.capacity} pessoas) - {room.location || "N/A"}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || loadingRooms || !currentUserId}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : reservationToEdit ? "Atualizar Reserva" : "Criar Reserva"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
