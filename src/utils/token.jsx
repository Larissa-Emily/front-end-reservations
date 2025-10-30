import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // segundos
    return decoded.exp < now; // true se expirado
  } catch (err) {
    return true; // token inválido
  }
}
