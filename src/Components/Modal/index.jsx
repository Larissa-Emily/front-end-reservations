import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { authService } from "../../services/auth.service";
export default function ModalRegister({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !sector || !email || !password || !role) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await authService.fetch("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, sector, email, password, role }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        // Limpa os campos
        setName("");
        setSector("");
        setEmail("");
        setPassword("");
        setRole("");
        onClose(); // Fecha o modal
      } else {
        alert("Erro ao cadastrar usuário!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar usuário!");
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
            Cadastrar Usuário
          </h1>
          <span className="text-white/80 text-sm mb-6 block">
            Preencha os dados do novo usuário
          </span>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Digite o setor"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Select em vez de input text */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" className="bg-[#0e4986]">
                Selecione o tipo de usuário
              </option>
              <option value="user" className="bg-[#0e4986]">
                Usuário
              </option>
              <option value="manager" className="bg-[#0e4986]">
                Gerente
              </option>
            </select>

            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-200"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
