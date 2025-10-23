import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Adiciona loading
  const navigate = useNavigate();

  async function handleLogin(e) {
  e.preventDefault();
  
  console.log('1. Iniciando login...');
  
  if (email === "" || password === "") {
    alert("Preencha todos os campos!");
    return;
  }

  setLoading(true);

  try {
    console.log('2. Chamando authService.login...');
    const token = await authService.login(email, password);
    console.log('3. Token recebido:', token);
    
    console.log('4. Pegando ID do usuário...');
    const userId = authService.getUserId();
    console.log('5. ID do usuário:', userId);
    
    console.log('6. Navegando para dashboard...');
    navigate("/dashboard");
    console.log('7. Navegação concluída');
    
  } catch (error) {
    console.error('❌ ERRO:', error);
    console.error('❌ Mensagem:', error.message);
    console.error('❌ Stack:', error.stack);
    alert("Usuário ou senha incorretos!");
  } finally {
    console.log('8. Finalizando...');
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
            disabled={loading}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Carregando..." : "Acessar"}
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
