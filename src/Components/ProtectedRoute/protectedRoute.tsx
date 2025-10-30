import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/token";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "manager";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("access_token");
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Erro ao fazer parse do usuário:", error);
    localStorage.removeItem("user");
  }

  // ⚠️ Se o token não existir ou estiver expirado, volta pro login
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  // ⚠️ Se precisar de role específica e o usuário não tiver
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e4986]">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-4">🚫 Acesso Negado</h1>
          <p className="text-white/80">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Tudo certo — renderiza o conteúdo protegido
  return <>{children}</>;
}
