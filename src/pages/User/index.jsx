import React from "react";
import { useState, useEffect } from "react";
import SearchBarUser from "../../Components/SearchBarUser";
import ModalRegister from "../../Components/Modal";
import ModalConfirm from "../../Components/ModalConfirm";
import ModalUser from "../../Components/ModalUser";

export default function User() {
  const token = localStorage.getItem("access_token")
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados do Modal Update
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);

  // Estados dos modais
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Usuário selecionado pra editar/deletar
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      } 

      const data = await response.json();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários!");
    } finally {
      setLoading(false);
    }
  }

  function handleUpdate(user) {
    console.log(user)
    setSelectedUser(user);
    setIsModalUserOpen(true);
  }

  function handleSearch(filters) {
    let filtered = usuarios;

    if (filters.name) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    setFilteredUsuarios(filtered);
  }

  function handleDeleteClick(user) {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  }

  async function handleDelete() { 
    try {
      const response = await fetch(`http://localhost:3000/user/${selectedUser.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
      }

      alert("Usuário deletado com sucesso!");
      fetchUsuarios(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar usuário!");
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div className="p-8 mt-[20px] bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gerenciar Usuários
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredUsuarios.length} usuário(s) encontrado(s)
          </p>
        </div>
      </div>

      <SearchBarUser onSearch={handleSearch} />
      <div className="flex justify-end p-[20px]">
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 "
        >
          + Novo
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
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
                Tipo de usuário
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
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
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
                    <div className="text-sm text-gray-600">
                      {user.functionUser}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "manager"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role === "manager" ? "Gerente" : "Usuário"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleUpdate(user)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-4 transition-colors"
                    >
                      Editar
                    </button>

                    {/* ✅ Botão Deletar */}
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalRegister
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          fetchUsuarios();
        }}
      />
      {selectedUser && (
        <ModalUser
          isOpen={isModalUserOpen}
          onClose={() => setIsModalUserOpen(false)}
          user={selectedUser}
          onUpdated={fetchUsuarios}
        />
      )}

      {selectedUser && (
        <ModalConfirm
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o usuário "${selectedUser.name}"? Esta ação não pode ser desfeita.`}
        />
      )}
    </div>
  );
}
