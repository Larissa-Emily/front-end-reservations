import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [blockedUntil, setBlockedUntil] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const lock = localStorage.getItem("lock_until");
    if (lock) {
      const parsed = parseInt(lock);
      if (parsed && parsed > Date.now()) {
        setBlockedUntil(parsed);
      } else {
        localStorage.removeItem("lock_until");
      }
    }
  }, []);

  // Função auxiliar pra exibir quanto tempo falta
  function getTimeRemaining() {
    if (!blockedUntil) return 0;
    const diff = blockedUntil - Date.now();
    return Math.max(0, Math.ceil(diff / 1000 / 60)); // em minutos
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos!");
      return;
    }
    if (blockedUntil && blockedUntil > Date.now()) {
      const mins = getTimeRemaining();
      toast.error(
        `Conta bloqueada. Aguarde ${mins} minuto(s) para tentar novamente.`
      );
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3000/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || "Erro ao fazer login.";

        if (message.toLowerCase().includes("bloquead")) {
          const waitMinutes = parseInt(message.match(/(\d+)/)?.[0] || "10", 10);
          const until = Date.now() + waitMinutes * 60 * 1000;
          setBlockedUntil(until);
          localStorage.setItem("lock_until", until.toString());
        }

        throw new Error(message);
      }
      const data = await response.json();
      const token = data.access_token;

      if (!token) {
        throw new Error("Token não recebido pelo servidor!");
      }

      if (data.access_token && data.user) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("lock_until");
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      } else {
        throw new Error("Erro ao receber dados do servidor.");
      }
    } catch (error) {
      toast.error("Erro ao fazer login!");
    } finally {
      setLoading(false);
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
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || (blockedUntil && blockedUntil > Date.now())}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || (blockedUntil && blockedUntil > Date.now())}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading || (blockedUntil && blockedUntil > Date.now())}
            className="p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Carregando..."
              : blockedUntil && blockedUntil > Date.now()
              ? `Bloqueado (${getTimeRemaining()} min)`
              : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
