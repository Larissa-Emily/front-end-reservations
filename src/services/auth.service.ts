import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: number;
  name: string;
  sector: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';
  private readonly API_URL = 'http://localhost:3000';

  // 1. FAZER LOGIN
  async login(email: string, password: string) {
    const response = await fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Login falhou');
    }

    const data = await response.json();
    const { access_token, user } = data;

    // Salva token e dados do usuário
    localStorage.setItem(this.TOKEN_KEY, access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    return access_token;
  }

  // 2. PEGAR TOKEN
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 3. PEGAR DADOS DO USUÁRIO (decodificando o token)
  getUser(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<TokenPayload>(token);
    } catch {
      return null;
    }
  }

  // 4. PEGAR DADOS DO USUÁRIO (do localStorage - mais rápido)
  getUserFromStorage() {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // 5. PEGAR ID DO USUÁRIO
  getUserId(): number | null {
    const user = this.getUser();
    return user?.sub || null;
  }

  // 6. PEGAR ROLE DO USUÁRIO
  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  // 7. VERIFICAR SE É MANAGER
  isManager(): boolean {
    return this.getUserRole() === 'manager';
  }

  // 8. VERIFICAR SE É USER
  isUser(): boolean {
    return this.getUserRole() === 'user';
  }

  // 9. VERIFICAR SE ESTÁ LOGADO
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  // 10. VERIFICAR SE O TOKEN EXPIROU
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Date.now() / 1000;
      return decoded.exp <= now;
    } catch {
      return true;
    }
  }

  // 11. VERIFICAR E REDIRECIONAR SE EXPIRADO
  checkAndRedirect(): boolean {
    if (this.isTokenExpired()) {
      this.logout();
      window.location.href = '/';
      return false;
    }
    return true;
  }

 // 12. FETCH COM TOKEN AUTOMÁTICO
async fetch(url: string, options: RequestInit = {}) {
  if (!this.checkAndRedirect()) {
    throw new Error("Token expirado");
  }
  const token = this.getToken();
  const response = await fetch(`${this.API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Trata erros de autenticação/autorização
  if (response.status === 401) {
    this.logout();
    window.location.href = '/';
    throw new Error('Não autorizado');
  }

  if (response.status === 403) {
    throw new Error('Você não tem permissão para realizar esta ação');
  }
  return response;
}


  // 13. LOGOUT
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // 14. VERIFICAR PERMISSÃO (útil pra componentes)
  hasPermission(requiredRole: string): boolean {
    const userRole = this.getUserRole();
    
    if (!userRole) return false;

    // Manager tem acesso a tudo
    if (userRole === 'manager') return true;

    // Verifica se a role do usuário é a necessária
    return userRole === requiredRole;
  }
}

// ✅ Exporta uma instância única
export const authService = new AuthService();
