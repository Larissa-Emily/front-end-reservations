import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'manager';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  // Verifica se está logado
  if (!authService.isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  // Verifica se tem a role necessária
  if (requiredRole && !authService.hasPermission(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e4986]">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-4">🚫 Acesso Negado</h1>
          <p className="text-white/80">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
