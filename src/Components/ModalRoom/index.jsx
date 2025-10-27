import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { roomService } from "../../services/room.service"; // Importa o serviço de salas

export default function ModalRoom({ isOpen, onClose, roomToEdit, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preenche o formulário se for para editar uma sala
  useEffect(() => {
    if (isOpen && roomToEdit) {
      setName(roomToEdit.name);
      setDescription(roomToEdit.description || "");
      setCapacity(roomToEdit.capacity);
      setLocation(roomToEdit.location || "");
      setIsAvailable(roomToEdit.isAvailable);
    } else if (isOpen && !roomToEdit) {
      // Limpa o formulário se for para criar uma nova sala
      setName("");
      setDescription("");
      setCapacity("");
      setLocation("");
      setIsAvailable(true);
    }
    setError(null); // Limpa erros ao abrir o modal
  }, [isOpen, roomToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!name || !capacity) {
      setError("Nome e Capacidade são campos obrigatórios.");
      return;
    }
    if (isNaN(capacity) || parseInt(capacity) < 1) {
      setError("Capacidade deve ser um número inteiro positivo.");
      return;
    }

    setLoading(true);
    const roomData = {
      name,
      description: description || null,
      capacity: parseInt(capacity),
      location: location || null,
      isAvailable,
    };

    try {
      let result;
      if (roomToEdit) {
        // Atualiza sala existente
        result = await roomService.updateRoom(roomToEdit.id, roomData);
        alert("Sala atualizada com sucesso!");
      } else {
        // Cria nova sala
        result = await roomService.createRoom(roomData);
        alert("Sala criada com sucesso!");
      }
      onSave(result); // Chama a função onSave para atualizar a lista no Dashboard
      onClose(); // Fecha o modal
    } catch (err) {
      console.error("❌ Erro ao salvar sala:", err);
      setError(err.message || "Erro ao salvar sala.");
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
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-white/20 relative">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <IoClose className="text-2xl" />
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            {roomToEdit ? "Editar Sala" : "Criar Nova Sala"}
          </h1>
          <span className="text-white/80 text-sm mb-6 block">
            {roomToEdit ? "Atualize os dados da sala" : "Preencha os dados da nova sala"}
          </span>

          {error && (
            <div className="bg-red-500 text-white p-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome da Sala"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />

            <textarea
              placeholder="Descrição (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows="3"
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            ></textarea>

            <input
              type="number"
              placeholder="Capacidade"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              disabled={loading}
              min="1"
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />

            <input
              type="text"
              placeholder="Localização (opcional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={loading}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />

            <div className="flex items-center justify-center gap-2 text-white">
              <input
                type="checkbox"
                id="isAvailable"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isAvailable" className="text-white/80">
                Disponível
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : roomToEdit ? "Atualizar Sala" : "Criar Sala"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
