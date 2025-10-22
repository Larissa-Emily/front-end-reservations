import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (name !== "" && sector !== "" && email !== "" && password !== "") {
      await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, sector, email, password }),
      })
        .then(() => {
          navigate("/homePage", { replace: true });
        })
        .catch((error) => {
          alert(error);
        });

      setEmail("");
      setPassword("");
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#0e4986]">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2">Cadastrar-se</h1>
        <span className="text-white/80 text-sm mb-6 block">
          Vamos criar sua conta!
        </span>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Digite seu setor"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Cadastrar
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 inline-block text-sm text-white/80 hover:text-white transition"
        >
          Já possui uma conta?
          <span className="text-[#048bd2] hover:text-[#02a7ff] m-1">
            Faça login!
          </span>
        </Link>
      </div>
    </div>
  );
}
