// src/services/room.service.ts
import { authService } from "./auth.service";
import { Room, RoomFormData } from "../types"; // Importa as interfaces

class RoomService {
  private readonly API_URL = 'http://localhost:3000'; // Sua URL da API

  // 1. Criar uma nova sala
  async createRoom(roomData: RoomFormData): Promise<Room> {
    console.log('📤 [RoomService] Criando sala com dados:', roomData);
    try {
      const response = await authService.fetch("/room", {
        method: "POST",
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao criar sala" }));
        throw new Error(error.message || "Erro ao criar sala");
      }
      return await response.json();
    } catch (error: any) { // Usando 'any' para o erro, ou um tipo mais específico se souber
      console.error("❌ [RoomService] Erro ao criar sala:", error);
      throw error;
    }
  }

  // 2. Listar todas as salas
  async getAllRooms(): Promise<Room[]> {
    console.log('📤 [RoomService] Buscando todas as salas...');
    try {
      const response = await authService.fetch("/room", {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao listar salas" }));
        throw new Error(error.message || "Erro ao listar salas");
      }
      return await response.json();
    } catch (error: any) {
      console.error("❌ [RoomService] Erro ao listar salas:", error);
      throw error;
    }
  }

  // 3. Listar salas disponíveis
  async getAvailableRooms(): Promise<Room[]> {
    console.log('📤 [RoomService] Buscando salas disponíveis...');
    try {
      const response = await authService.fetch("/room/available", {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao listar salas disponíveis" }));
        throw new Error(error.message || "Erro ao listar salas disponíveis");
      }
      return await response.json();
    } catch (error: any) {
      console.error("❌ [RoomService] Erro ao listar salas disponíveis:", error);
      throw error;
    }
  }

  // 4. Buscar sala por ID
  async getRoomById(id: number): Promise<Room> {
    console.log(`📤 [RoomService] Buscando sala com ID: ${id}`);
    try {
      const response = await authService.fetch(`/room/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao buscar sala" }));
        throw new Error(error.message || "Erro ao buscar sala");
      }
      return await response.json();
    } catch (error: any) {
      console.error(`❌ [RoomService] Erro ao buscar sala com ID ${id}:`, error);
      throw error;
    }
  }

  // 5. Atualizar uma sala existente
  async updateRoom(id: number, roomData: RoomFormData): Promise<Room> {
    console.log(`📤 [RoomService] Atualizando sala ID ${id} com dados:`, roomData);
    try {
      const response = await authService.fetch(`/room/${id}`, {
        method: "PATCH",
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao atualizar sala" }));
        throw new Error(error.message || "Erro ao atualizar sala");
      }
      return await response.json();
    } catch (error: any) {
      console.error(`❌ [RoomService] Erro ao atualizar sala ID ${id}:`, error);
      throw error;
    }
  }

  // 6. Deletar uma sala
  async deleteRoom(id: number): Promise<boolean> {
    console.log(`📤 [RoomService] Deletando sala com ID: ${id}`);
    try {
      const response = await authService.fetch(`/room/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erro desconhecido ao deletar sala" }));
        throw new Error(error.message || "Erro ao deletar sala");
      }
      return true; // Retorna true se a exclusão foi bem-sucedida
    } catch (error: any) {
      console.error(`❌ [RoomService] Erro ao deletar sala ID ${id}:`, error);
      throw error;
    }
  }
}

export const roomService = new RoomService();
