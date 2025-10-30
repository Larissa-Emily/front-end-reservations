import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ModalReservation({
  isOpen,
  onClose,
  reservationToEdit,
  onSave,
}) {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const currentUserId = user?.id;

  useEffect(() => {
    if (isOpen) {
      loadAvailableRooms();
      if (reservationToEdit) {
        setDate(reservationToEdit.date.split("T")[0]);
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
      const availableRooms = await fetch(
        `http://localhost:3000/room/available`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!availableRooms.ok) {
        throw new Error("Erro ao buscar as salas disponiveis!");
      }
      const data = await availableRooms.json();
      setRooms(data);
    } catch (error) {
      setError(error);
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
      setError(
        "ID do usuário não encontrado. Por favor, faça login novamente."
      );
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
        result = await fetch(
          `http://localhost:3000/reservation/${reservationToEdit.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reservationData),
          }
        );

        if (!result.ok) {
          const errorData = await result.json();

          // Se o backend retornar 409 (Conflict)
          if (result.status === 409) {
            setError(
              errorData.message || "Essa sala já está reservada nesse horário."
            );
            toast.error("Essa sala já está reservada nesse horário!");
            setLoading(false);
            return;
          }

          throw new Error(errorData.message || "Erro ao criar reserva");
        }
        toast.success("Reserva atualizada com sucesso!");
      } else {
        result = await fetch(`http://localhost:3000/reservation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        });

        if (!result.ok) {
          const errorData = await result.json();

          // Se o backend retornar 409 (Conflict)
          if (result.status === 409) {
            setError(
              errorData.message || "Essa sala já está reservada nesse horário."
            );
            toast.error("Essa sala já está reservada nesse horário!");
            setLoading(false);
            return;
          }

          throw new Error(errorData.message || "Erro ao criar reserva");
        }

        toast.success("Reserva criada com sucesso!");
      }
      const responseData = await result.json();
      onSave(responseData);
      onClose();
    } catch (err) {
      setError(err.message || "Erro ao salvar reserva.");
      toast.error("Erro ao salvar a reserva.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#0e48868f] bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg text-center border border-white/20 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-white transition-colors cursor-pointer"
          >
            <IoClose className="text-2xl" />
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            {reservationToEdit ? "Editar Reserva" : "Nova Reserva"}
          </h1>
          <span className="text-white text-sm mb-6 block">
            {reservationToEdit
              ? "Atualize os dados da reserva"
              : "Preencha os dados da nova reserva"}
          </span>

          {error && (
            <div className="text-red-500 p-2 rounded-md mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Data */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
              min={new Date().toISOString().split("T")[0]}
              className="p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />

            <div className="flex gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={loading}
                className="flex-1 p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
              <span className="text-white self-center">até</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={loading}
                className="flex-1 p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                disabled={loading || loadingRooms}
                className="w-full p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 
             [&>option]:text-black [&>option]:bg-white"
              >
                <option value="">Selecione uma sala</option>
                {loadingRooms ? (
                  <option disabled>Carregando salas...</option>
                ) : (
                  rooms.map((room) => (
                    <option
                      key={room.id}
                      value={room.id}
                      className=" bg-white/20 text-white"
                    >
                      {room.name} ({room.capacity} pessoas) -{" "}
                      {room.location || "N/A"}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || loadingRooms || !currentUserId}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "Salvando..."
                : reservationToEdit
                ? "Atualizar Reserva"
                : "Criar Reserva"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
