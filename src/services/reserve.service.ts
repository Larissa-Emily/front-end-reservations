// src/services/reservation.service.ts
import { authService } from "./auth.service";
import { Reserve, ReservationFormData } from "../types"; // Importa as novas interfaces

class ReservationService {
  private readonly API_URL = 'http://localhost:3000'; // Sua URL da API

  // 1. Criar uma nova reserva
  async createReservation(reservationData: ReservationFormData): Promise<Reserve> { // ✅ Tipado
    console.log('📤 [ReservationService] Criando reserva com dados:', reservationData);
    try {
      const response = await authService.fetch("/reservation", {
        method: "POST",
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao criar reserva" }));
        throw new Error(error.message || "Erro ao criar reserva");
      }
      return await response.json();
    } catch (error: any) {
      console.error("❌ [ReservationService] Erro ao criar reserva:", error);
      throw error;
    }
  }

  // 2. Listar todas as reservas (apenas para managers)
  async getAllReservations(): Promise<Reserve[]> { // ✅ Tipado
    console.log('📤 [ReservationService] Buscando todas as reservas...');
    try {
      const response = await authService.fetch("/reservation", {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao listar reservas" }));
        throw new Error(error.message || "Erro ao listar reservas");
      }
      return await response.json();
    } catch (error: any) {
      console.error("❌ [ReservationService] Erro ao listar reservas:", error);
      throw error;
    }
  }

  // 3. Listar reservas de um usuário específico
  async getUserReservations(userId: number): Promise<Reserve[]> { // ✅ Tipado
    console.log(`📤 [ReservationService] Buscando reservas do usuário ${userId}...`);
    try {
      const response = await authService.fetch(`/reservation/user/${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao listar reservas do usuário" }));
        throw new Error(error.message || "Erro ao listar reservas do usuário");
      }
      return await response.json();
    } catch (error: any) {
      console.error(`❌ [ReservationService] Erro ao listar reservas do usuário ${userId}:`, error);
      throw error;
    }
  }

  // 4. Listar reservas de uma sala específica
  async getRoomReservations(roomId: number): Promise<Reserve[]> { // ✅ Tipado
    console.log(`📤 [ReservationService] Buscando reservas da sala ${roomId}...`);
    try {
      const response = await authService.fetch(`/reservation/room/${roomId}`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao listar reservas da sala" }));
        throw new Error(error.message || "Erro ao listar reservas da sala");
      }
      return await response.json();
    } catch (error: any) {
      console.error(`❌ [ReservationService] Erro ao listar reservas da sala ${roomId}:`, error);
      throw error;
    }
  }

  // 5. Buscar reserva por ID
  async getReservationById(id: number): Promise<Reserve> { // ✅ Tipado
    console.log(`📤 [ReservationService] Buscando reserva com ID: ${id}`);
    try {
      const response = await authService.fetch(`/reservation/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao buscar reserva" }));
        throw new Error(error.message || "Erro ao buscar reserva");
      }
      return await response.json();
    } catch (error: any) {
      console.error(`❌ [ReservationService] Erro ao buscar reserva com ID ${id}:`, error);
      throw error;
    }
  }

  // 6. Atualizar uma reserva existente
  async updateReservation(id: number, reservationData: Partial<ReservationFormData>): Promise<Reserve> { // ✅ Tipado (Partial para atualização)
    console.log(`📤 [ReservationService] Atualizando reserva ID ${id} com dados:`, reservationData);
    try {
      const response = await authService.fetch(`/reservation/${id}`, {
        method: "PATCH",
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao atualizar reserva" }));
        throw new Error(error.message || "Erro ao atualizar reserva");
      }
      return await response.json();
    } catch (error: any) {
      console.error(`❌ [ReservationService] Erro ao atualizar reserva ID ${id}:`, error);
      throw error;
    }
  }

  // 7. Cancelar/Deletar uma reserva
  async cancelReservation(id: number): Promise<boolean> { // ✅ Tipado
    console.log(`📤 [ReservationService] Cancelando reserva com ID: ${id}`);
    try {
      const response = await authService.fetch(`/reservation/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao cancelar reserva" }));
        throw new Error(error.message || "Erro ao cancelar reserva");
      }
      return true;
    } catch (error: any) {
      console.error(`❌ [ReservationService] Erro ao cancelar reserva ID ${id}:`, error);
      throw error;
    }
  }
}

export const reservationService = new ReservationService();
