import React from "react";
import { useState, useEffect } from "react";
import Image from "../../assets/Image.jpg";
import { TbPencilMinus } from "react-icons/tb";
import ModalUser from "../../Components/ModalUser/index";
export default function MyProfile() {
  const [user, setUser] = useState("");
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      handleGetUser(user);
    }
  }, [user]);

  async function handleGetUser(user) {
    try {
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário por id");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleUpdate(user) {
    console.log(user);
    setSelectedUser(user);
    setIsModalUserOpen(true);
  }

  function formatPhone(phone) {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, ""); // remove tudo que não é número

    // Se o número tiver 11 dígitos (DDD + número)
    if (cleaned.length === 11) {
      return `+55 (${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        7
      )}-${cleaned.slice(7)}`;
    }

    // Se tiver 10 dígitos (sem o 9 na frente)
    if (cleaned.length === 10) {
      return `+55 (${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        6
      )}-${cleaned.slice(6)}`;
    }

    // Caso não bata nenhum formato, retorna o número cru
    return `+55 ${cleaned}`;
  }

  return (
    <div>
      <header>
        <h1 className="text-[24px] font-bold text-[#232323] pb-[20px]">
          Meu perfil
        </h1>
      </header>
      <section className="border border-solid border-[#0000001A] rounded-lg w-[90%] h-[140px] items-center flex justify-between">
        <div className="flex items-center p-[20px]">
          <img
            src={Image}
            alt="perfil"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="pl-[20px]">
            <h3 className="text-[#434966] text-[16px] font-bold">
              {userData.name}
            </h3>
            <p className="text-[#82889c]">{userData.functionUser}</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleUpdate(user)}
            className="border border-solid border-[#434966] w-[117px] h-[40px] rounded-lg flex justify-around items-center mr-[15px] cursor-pointer"
          >
            Editar <TbPencilMinus />
          </button>
        </div>
      </section>
      <section className="border border-solid border-[#0000001A] rounded-lg w-[90%] h-[214px] mt-[20px]">
        <header className="flex justify-between items-center p-[20px]">
          <h3 className="text-[#434966] text-[18px] font-semibold">
            Informações Pessoais
          </h3>
        </header>

        {/* Conteúdo dos dados */}
        <div className="px-[20px] pb-[10px]">
          <div className="grid grid-cols-3 gap-y-4 text-sm text-gray-600">
            {/* Nome */}
            <div>
              <p className="text-[#9CA3AF]">Nome</p>
              <p className="text-[#1F2937] font-medium">{userData.name}</p>
            </div>

            {/* Função */}
            <div>
              <p className="text-[#9CA3AF]">Função</p>
              <p className="text-[#1F2937] font-medium">
                {userData.functionUser}
              </p>
            </div>

            {/* Telefone */}
            <div>
              <p className="text-[#9CA3AF]">Telefone</p>
              <p className="text-[#1F2937] font-medium">
                {formatPhone(userData.phone)}
              </p>
            </div>

            {/* E-mail */}
            <div>
              <p className="text-[#9CA3AF]">E-mail</p>
              <p className="text-[#1F2937] font-medium">{userData.email}</p>
            </div>

            {/* Setor */}
            <div>
              <p className="text-[#9CA3AF]">Setor</p>
              <p className="text-[#1F2937] font-medium">{userData.sector}</p>
            </div>
            {/* Tipo de usuario */}
            <div>
              <p className="text-[#9CA3AF]">Tipo de usuario</p>
              <p className="text-[#1F2937] font-medium">{userData.role}</p>
            </div>
          </div>
        </div>
        {selectedUser && (
          <ModalUser
            isOpen={isModalUserOpen}
            onClose={() => setIsModalUserOpen(false)}
            user={selectedUser}
            onUpdated={(updateUser) => {
              setUser(updateUser);
              localStorage.setItem("user", JSON.stringify(updateUser));
            }}
          />
        )}
      </section>
    </div>
  );
}
