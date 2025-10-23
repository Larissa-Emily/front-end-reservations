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
  private readonly API_URL = 'http://localhost:3000';

  // 1. FAZER LOGIN
  async login(email: string, password: string) {
    console.log('AuthService - Enviando:', { email, password });

    const response = await fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    console.log('Status da resposta:', response.status);
    const data = await response.json();
    console.log('Dados recebidos:', data);

    if (!response.ok) {
      throw new Error('Login falhou');
    }

    const { access_token } = data;
    localStorage.setItem(this.TOKEN_KEY, access_token);

    return access_token;
  }
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.sub;  // ✅ Retorna o ID
    } catch {
      return null;
    }
  }

  getUser(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<TokenPayload>(token);
    } catch {
      return null;
    }
  }
  // 4. VERIFICAR SE TÁ LOGADO
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


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  async fetch(url: string, options: RequestInit = {}) {
    const token = this.getToken();

    return fetch(`${this.API_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

// ✅ Exporta uma instância única
export const authService = new AuthService();
