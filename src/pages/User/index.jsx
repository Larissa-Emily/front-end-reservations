import React, { useState, useEffect } from "react";
import SearchBarUser from "../../Components/SearchBarUser";
import { authService } from "../../services/auth.service";

export default function User() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Busca inicial dos usuários
  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    try {
      setLoading(true);
      const response = await authService.fetch('/user');
      const data = await response.json();
      
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Função de busca/filtro
  function handleSearch({ name, email }) {
    let filtered = usuarios;

    // Filtra por nome
    if (name) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Filtra por email
    if (email) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    setFilteredUsuarios(filtered);
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Usuários</h1>
        <p className="text-gray-600 mt-1">
          {filteredUsuarios.length} usuário(s) encontrado(s)
        </p>
      </div>

      {/* Barra de Busca */}
      <SearchBarUser onSearch={handleSearch} />
    <div>
    <button>Novo usuário</button>
    </div>
      {/* Lista de Usuários */}
      <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Setor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Função
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsuarios.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Nenhum usuário encontrado
                </td>
              </tr>
            ) : (
              filteredUsuarios.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{user.sector}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'manager' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'manager' ? 'Gerente' : 'Usuário'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
