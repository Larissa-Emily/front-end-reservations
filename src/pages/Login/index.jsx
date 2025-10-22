import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "string", password: "string" }),
      });
      if (response.ok) {
        alert("Login realizado com sucesso!");
        navigate("/homePage");
      } else {
        alert("Usuario ou senha incorretos!");
      }
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e4986]">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/20 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">BP Room</h1>
        <span className="text-blue-200 mb-6 block">
          Transforme o jeito que sua equipe organiza reuniões.
        </span>

        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200"
          >
            Acessar
          </button>
        </form>

        <Link
          className="text-blue-200 mt-4 inline-block hover:text-white transition-colors duration-200"
          to="/register"
        >
          Não possui uma conta?
          <span className="text-[#048bd2] hover:text-[#02a7ff] m-1">
            Cadastra-se
          </span>
        </Link>
      </div>
    </div>
  );
}
