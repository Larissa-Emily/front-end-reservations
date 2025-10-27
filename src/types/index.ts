// src/types/index.ts

// Interface para a entidade Room (Sala)
export interface Room {
  id: number;
  name: string;
  description: string | null;
  capacity: number;
  location: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface para a entidade User (Usuário)
export interface User {
  id: number;
  name: string;
  email: string;
  sector: string;
  role: string;
}

// Interface para os dados de criação/atualização de sala (DTO)
export interface RoomFormData {
  name: string;
  description?: string | null;
  capacity: number;
  location?: string | null;
  isAvailable?: boolean;
}

// ✅ NOVO: Interface para a entidade Reserve (Reserva)
// Baseado na sua ReserveEntity, mas com a data como string para o frontend
export interface Reserve {
  id: number;
  date: string; // Data como string (YYYY-MM-DD) para o frontend
  startTime: string;
  endTime: string;
  roomId: number;
  userId: number;
  room: Room; // Inclui os dados da sala relacionada
  user: User; // Inclui os dados do usuário relacionado
  createdAt: string;
  updatedAt: string;
}

// ✅ NOVO: Interface para os dados de criação/atualização de reserva (DTO)
export interface ReservationFormData {
  date: string;
  startTime: string;
  endTime: string;
  roomId: number;
  userId: number; // userId será injetado no backend, mas é bom ter no DTO para consistência
}

// ✅ NOVO: Interface para os filtros da SearchBar de salas
export interface RoomFilters {
  name: string;
  capacity: string;
  characteristics: string; // Mapeia para 'description'
  location: string;
}
